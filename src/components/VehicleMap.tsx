import React, {useContext, useEffect, useRef} from 'react';
import axios from 'axios';
import {Plugins} from '@capacitor/core';
import styled from "styled-components";
import * as _ from "lodash";
import {Camera, MapProps} from "../Type";
import {VehicleContext} from "../contexts/VehicleContext";
import {CameraContext} from "../contexts/CameraContext";

const {Network} = Plugins;

const MapContainer = styled.div`
  height: 100%;
`

const iconUrl = {
  cctv: 'assets/images/cctv.png',
  car: 'assets/images/car.png',
}

let map: any = '555';
let markers: any = {
  cameras: [],
  vehicles: []
};
let mapsLoaded: boolean = false;
let networkHandler: any = null;
let vehicleTimeout: any;

const VehicleMap: React.FC<MapProps> = ({apiKey, selectCamera, selectVehicle, plate, platePrefix}) => {
  const mapRef = useRef(null);
  const mapRef2 = useRef(null);
  const {vehicles, setVehicles} = useContext(VehicleContext);
  const {cameras, setCameras} = useContext(CameraContext);

  let isCameraFetch: boolean = false;

  const loadSDK = (mapReference: any) => {

    console.log("Loading Google Maps SDK");

    return new Promise<any>((resolve, reject) => {

      if (!mapsLoaded) {

        Network.getStatus().then((status) => {

          if (status.connected) {

            injectSDK().then((res) => {
              resolve(true);
            }, (err) => {
              reject(err);
            });

          } else {

            if (networkHandler == null) {

              networkHandler = Network.addListener('networkStatusChange', (status) => {

                if (status.connected) {

                  networkHandler.remove();

                  init(mapReference).then((res) => {
                    console.log("Google Maps ready.")
                  }, (err) => {
                    console.log(err);
                  });

                }

              });

            }

            reject('Not online');
          }

        }, (err) => {

          // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
          if (navigator.onLine) {

            injectSDK().then((res) => {
              resolve(true);
            }, (err) => {
              reject(err);
            });

          } else {
            reject('Not online');
          }

        });

      } else {
        reject('SDK already loaded');
      }

    });


  }

  const injectSDK = () => {

    return new Promise((resolve, reject) => {

      (window as any)['mapInit'] = () => {
        mapsLoaded = true;
        resolve(true);
      }

      let script = document.createElement('script');
      script.id = 'googleMaps';


      if (apiKey) {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=mapInit';
      } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }

      document.body.appendChild(script);

    });

  }

  const initMap = (mapReference: any) => {

    return new Promise((resolve, reject) => {

      let latLng = new google.maps.LatLng(13.756331, 100.501762);

      let mapOptions = {
        center: latLng,
        zoom: 17,
        disableDefaultUI: true,
        zoomControl: true,
      };
      map = new google.maps.Map((mapReference as any).current, mapOptions);
      resolve(true);
    });

  }

  const init = (mapReference: any) => {

    return new Promise((resolve, reject) => {

      loadSDK(mapReference).then((res) => {

        initMap(mapReference).then((res) => {
          resolve(true);
        }, (err) => {
          reject(err);
        });

      }, (err) => {

        reject(err);

      });

    });

  }

  const addMarker = (lat: number, lng: number, icon: string, id: number) => {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: map,
      position: latLng,
      icon: icon
    });

    marker.addListener('click', function () {
      if (icon === iconUrl.car) {
        selectVehicle(id)
        console.log('>> id: ', id)
      } else {
        selectCamera(id)
      }
    })
    if (icon === iconUrl.car) {
      markers['vehicles'].push(marker);
    } else {
      markers['cameras'].push(marker);
    }


  }

  const fetchVehicle = (plate = '', platePrefix = '') => {
    let url = 'http://localhost:8000/api/vehicles'
    if (plate !== '') {
      url = 'http://localhost:8000/api/vehicle?text=' + plate + '&text-prefix=' + platePrefix;
    }
    axios.get(url)
      .then(res => {
        const vehicle = res.data.data;
        setVehicles(vehicle);
      })
  }

  useEffect(() => {
    let newMapRef = plate !== '' ? mapRef : mapRef2;

    init(newMapRef).then((res) => {
      console.log("Google Maps ready.")
      axios.get(' http://localhost:8000/api/cameras')
        .then(res => {
          const cameraData = res.data.data;
          setCameras(cameraData);
        })

      fetchVehicle()
      vehicleTimeout = setInterval(fetchVehicle, 3000)

    }, (err) => {
      console.log('>> err: ', err)
      if (err == 'SDK already loaded') {
        initMap(newMapRef).then((res) => {
          axios.get(' http://localhost:8000/api/cameras')
            .then(res => {
              const cameraData = res.data.data;
              setCameras(cameraData);
            })

          fetchVehicle(plate, platePrefix)
          if (plate === '') {
            vehicleTimeout = setInterval(fetchVehicle, 3000)
          }
        }, (err) => {
          console.log('>> err: ', err)
        });
      }
    });

    return () => {
      clearInterval(vehicleTimeout);
    };
  }, [mapRef, mapRef2])

  useEffect(() => {

    console.log('>> map: ', isCameraFetch)
    if (!_.isEmpty(cameras)) {
      if (!isCameraFetch) {
        map.setCenter(new google.maps.LatLng(13.6508009, 100.4943651));
        isCameraFetch = true;
      }
      cameras.forEach((camera: any) => {
        addMarker(camera.camera_lat, camera.camera_long, iconUrl.cctv, camera.camera_id);
      })
    }

  }, [cameras])

  useEffect(() => {
    if (plate === '') {
      markers['vehicles'].forEach((marker: any) => {
        marker.setMap(null)
      })
      markers['vehicles'] = []
    }
    if (!_.isEmpty(vehicles)) {

      let prev: any;
      vehicles.forEach((vehicle: any, vehicleId: number) => {
        let findCamera: Camera | undefined = _.find(cameras, {camera_id: vehicle.camera_id});
        if (findCamera) {
          addMarker(findCamera.camera_vehicle_lat + (findCamera.camera_lat_diff * (vehicleId + 1)), findCamera.camera_vehicle_long + (findCamera.camera_long_diff * (vehicleId + 1)), iconUrl.car, vehicle.vehicle_id);
        }

        prev = vehicle
      })
    }
  }, [vehicles])

  if (!_.isEmpty(plate)) {
    return (
      <MapContainer id="map" ref={mapRef}>
      </MapContainer>
    );
  }
  return (
    <MapContainer id="map2" ref={mapRef2}>
    </MapContainer>
  );
};

VehicleMap.defaultProps = {
  plate: '',
  platePrefix: ''
}

export default VehicleMap;
