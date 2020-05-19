import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  IonAlert,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {SearchInput} from '../components/Search';
import styled from "styled-components";
import {menuController} from "@ionic/core";
import {Camera, FormData, thaiColor, thaiType, Vehicle} from "../Type";
import CameraProvider, {CameraContext} from "../contexts/CameraContext";
import * as _ from "lodash";
import axios from "axios";
import {useHistory} from "react-router";
import {UserContext} from "../contexts/UserContext";

const TypeWrapper = styled.div` 
  margin-top: 50px;
`

const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Header = styled.div`
  font-size: 12px;
  margin-left: 7px;
`

const Button = styled.button`
  padding: 5px 8px;
  font-size: 13px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.12);
  background-color: white;
  margin: 3px 3px 3px 0;
  
  &:hover, &.active {
    background: orange;
    color: white;
  }
`

export const ResultWrapper = styled.div`
  font-weight: 300;
  font-size: 12px;
`

export const ResultCard = styled.div`
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.12);
  display: flex;
`

export const VehicleImage = styled.img`
  width: 70px;
  margin-right: 10px;
`

export const VehicleDetail = styled.div`
  flex: 1;
`

export const TrackButton = styled.div`
  border-left: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  color: darkorange;
  text-align: center;
  cursor: pointer;
`

export const Container = styled.div`
  padding: 20px;
`

const NotFoundWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 20px;
`

const initialFormData = {
  search: '',
  search_prefix: '',
  vehicle_type: 'all',
  vehicle_color: 'all',
  camera_id: 0,
}

const Search: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [typeActive, setTypeActive] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedCamera, setSelectedCamera] = useState(0);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();

  const {cameras, setCameras} = useContext(CameraContext);
  const {userData, setUserData} = useContext(UserContext);

  const searchCallback = useCallback(
    _.debounce((e: any) => {
      setFormData({...formData, search: e.target.value})
    }, 300)
    , [formData]);

  const searchPrefixCallback = useCallback(
    _.debounce((e: any) => {
      setFormData({...formData, search_prefix: e.target.value})
    }, 300)
    , [formData]);

  useEffect(() => {
    axios.get(' http://localhost:8000/api/vehicle?text=' + formData.search + '&text-prefix=' + formData.search_prefix + '&type=' + formData.vehicle_type + '&camera=' + formData.camera_id + '&color=' + formData.vehicle_color)
      .then(res => {
        const vehicle = res.data.data;
        setVehicles(vehicle);
      })
  }, [formData])

  const selectType = function (type: any) {
    setFormData({...formData, vehicle_type: type})
    setTypeActive(type);
  }

  const setSelectedColorData = function (color: string) {
    if (formData.vehicle_color === color) {
      return false;
    }
    setFormData({...formData, vehicle_color: color})
    setSelectedColor(color);

  }

  const setSelectedCameraData = function (camera_id: number) {
    if (formData.camera_id === camera_id) {
      return false;
    }
    setFormData({...formData, camera_id: camera_id})
    setSelectedCamera(camera_id);

  }

  const trackVehicle = useCallback((vehicle) => {
    return () => {
      if (userData.userId) {
        history.push({
          pathname: '/page/track',
          state: {
            plate: vehicle.vehicle_plate,
            platePrefix: vehicle.vehicle_plate_prefix,
          }
        })
      } else {
        setShowAlert(true)
      }
    }
  }, [userData]);

  const searchChange = useCallback((e: any) => {
    searchCallback(e)
  }, [])

  const searchPrefixChange = useCallback((e: any) => {
    searchPrefixCallback(e)
  }, [])

  const alertDidMiss = useCallback(() => {
    setShowAlert(false);
    menuController.toggle();
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Vehicle Searching</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={alertDidMiss}
          header={'ไม่สามารถใช้งานได้'}
          message={'ไม่สามารถใช้งานส่วนนี้ได้เนื่องจากคุณไม่ใช่เจ้าหน้าที่ กรุณาเข้าสู่ระบบก่อนใช้งาน'}
          buttons={['เข้าสู่ระบบ']}
        />
        <Container>
          <div>
            <Header>ป้ายทะเบียน</Header>
            <SelectWrapper>
              <SearchInput platePrefix={true} placeholder="ส่วนตัวอักษร" onIonChange={searchPrefixChange}/>
              <SearchInput plate={true} placeholder="ส่วนตัวตัวเลข" onIonChange={searchChange}/>
            </SelectWrapper>
          </div>

          <CameraProvider>
            <div style={{marginTop: '15px'}}>
              <Header>ตำแหน่ง</Header>
              <SelectWrapper>
                <IonSelect value={selectedCamera} placeholder="เลือกตำแหน่ง"
                           onIonChange={(e: any) => setSelectedCameraData(e.target.value)}>
                  <IonSelectOption value={0}>ทุกตำแหน่ง</IonSelectOption>
                  {cameras.map((camera: Camera) => {
                    return (
                      <IonSelectOption key={camera.camera_id}
                                       value={camera.camera_id}>{camera.camera_name}</IonSelectOption>
                    )
                  })

                  }
                </IonSelect>
              </SelectWrapper>
            </div>
            <div>
              <Header>สี</Header>
              <SelectWrapper>
                <IonSelect value={selectedColor} placeholder="เลือกสี"
                           onIonChange={(e: any) => setSelectedColorData(e.target.value)}>
                  <IonSelectOption value="all">ทุกสี</IonSelectOption>
                  <IonSelectOption value="red">สีแดง</IonSelectOption>
                  <IonSelectOption value="blue">สีน้ำเงิน</IonSelectOption>
                  <IonSelectOption value="black">สีดำ</IonSelectOption>
                  <IonSelectOption value="white">สีขาว</IonSelectOption>
                  <IonSelectOption value="pink">สีชมพู</IonSelectOption>
                  <IonSelectOption value="green">สีเขียว</IonSelectOption>
                  <IonSelectOption value="yellow">สีเหลือง</IonSelectOption>
                </IonSelect>
              </SelectWrapper>
            </div>
            <div>
              <Header>ประเภท</Header>
              <SelectWrapper>
                <Button className={typeActive === 'all' ? 'active' : ''}
                        onClick={(e: any) => selectType('all')}>ทุกประเภท</Button>
                <Button className={typeActive === 'car' ? 'active' : ''}
                        onClick={(e: any) => selectType('car')}>รถยนต์</Button>
                <Button className={typeActive === 'auto rickshaw' ? 'active' : ''}
                        onClick={(e: any) => selectType('auto rickshaw')}>รถตุ๊กๆ</Button>
                <Button className={typeActive === 'suv' ? 'active' : ''}
                        onClick={(e: any) => selectType('suv')}>SUV</Button>
                <Button className={typeActive === 'pickup' ? 'active' : ''}
                        onClick={(e: any) => selectType('pickup')}>รถกระบะ</Button>
                <Button className={typeActive === 'bus' ? 'active' : ''}
                        onClick={(e: any) => selectType('bus')}>รถบัส</Button>
                <Button className={typeActive === 'truck' ? 'active' : ''}
                        onClick={(e: any) => selectType('truck')}>รถบรรทุก</Button>
                <Button className={typeActive === 'motorcycle' ? 'active' : ''}
                        onClick={(e: any) => selectType('motorcycle')}>จักรยานยนต์</Button>
              </SelectWrapper>
            </div>
            <ResultWrapper>
              {!_.isEmpty(vehicles) ?
                vehicles.map((vehicle: Vehicle) => (
                  <ResultCard key={vehicle.vehicle_id}>
                    <VehicleImage src={vehicle.vehicle_image}/>
                    <VehicleDetail>
                      <div>{thaiType[vehicle.vehicle_type]} {thaiColor[vehicle.vehicle_color]}</div>
                      <div>ป้ายทะเบียน {vehicle.vehicle_plate_prefix}{vehicle.vehicle_plate}</div>
                      <div>ตำแหน่ง {}</div>
                    </VehicleDetail>
                    <TrackButton onClick={trackVehicle(vehicle)}>ดูตำแหน่ง</TrackButton>
                  </ResultCard>
                )) :
                (
                  <NotFoundWrapper>
                    Vehicle not found.
                  </NotFoundWrapper>
                )
              }
            </ResultWrapper>
          </CameraProvider>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Search;
