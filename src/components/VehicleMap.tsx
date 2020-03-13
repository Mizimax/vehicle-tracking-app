import React, {useEffect, useRef} from 'react';

import {Plugins} from '@capacitor/core';
import styled from "styled-components";

const {Network} = Plugins;

type MapProps = {
  apiKey: string,
}

const MapContainer = styled.div`
  height: 100%;
`

const VehicleMap: React.FC<MapProps> = ({apiKey}) => {
  let map: any;
  let markers: any[] = [];
  let mapsLoaded: boolean = false;
  let networkHandler: any = null;
  const mapRef = useRef(null);

  const loadSDK = () => {

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

                  init().then((res) => {
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

  const initMap = () => {

    return new Promise((resolve, reject) => {

      let latLng = new google.maps.LatLng(13.756331, 100.501762);

      let mapOptions = {
        center: latLng,
        zoom: 13,
        disableDefaultUI: true,
        zoomControl: true,
      };

      map = new google.maps.Map((mapRef as any).current, mapOptions);
      resolve(true);

    });

  }

  const init = () => {

    return new Promise((resolve, reject) => {

      loadSDK().then((res) => {

        initMap().then((res) => {
          resolve(true);
        }, (err) => {
          reject(err);
        });

      }, (err) => {

        reject(err);

      });

    });

  }

  const addMarker = (lat: number, lng: number) => {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    marker.addListener('click', function () {

    })

    markers.push(marker);

  }

  useEffect(function () {
    init().then((res) => {
      console.log("Google Maps ready.")
      addMarker(13.756331, 100.501762);
      addMarker(13.756331, 100.001762);
      addMarker(13.756331, 100.201762);

    }, (err) => {
      console.log(err);
    });
  }, [])

  return (
    <MapContainer ref={mapRef}>
    </MapContainer>
  );
};

export default VehicleMap;
