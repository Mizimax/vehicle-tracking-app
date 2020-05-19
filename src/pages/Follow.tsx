import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import {Container, ResultCard, ResultWrapper, TrackButton, VehicleDetail, VehicleImage} from "./Search";
import styled from "styled-components";
import axios from "axios";
import {thaiColor, thaiType, Vehicle} from "../Type";
import {UserContext} from "../contexts/UserContext";
import {menuController} from "@ionic/core";
import {useHistory} from "react-router";
import {Plugins} from '@capacitor/core';

const Header = styled.div`
  font-weight: 300;
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`

const ActionButton = styled.button`
  background-color: orange;
  color: white;
  padding: 7px 20px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 300;
`

const Follow: React.FC = () => {
  const [myCars, setMyCars] = useState<Vehicle[]>([]);
  const history = useHistory();
  const {userData, setUserData} = useContext(UserContext);

  useIonViewWillEnter(() => {
    if (userData.userId) {

      const url = ' http://localhost:8000/api/vehicle/me';
      const urlWithToken = url + '?token=' + (localStorage.getItem('JWTKey') ? localStorage.getItem('JWTKey') : '');
      axios.get(urlWithToken)
        .then(res => {
          const response = res.data;
          const data = response.data;
          setMyCars(data);
          Plugins.LocalNotifications.schedule({
            notifications: [
              {
                title: "แจ้งเตือนการติดตามยานพาหนะ",
                body: "ตรวจพบรถยนต์ สีขาว ป้ายทะเบียน กต 13120 ที่ตำแหน่ง กล้องหน้าดิโอโร่",
                id: 1,
                attachments: ['assets/images/car.png'] as any,
                schedule: {at: new Date(Date.now() + 1000 * 5)},
              }
            ]
          });
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            const errorDetail = error.response.data
            console.log(errorDetail);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }

        });
    }
  }, [userData]);

  useEffect(() => {
    if (userData.userId) {
      const url = ' http://localhost:8000/api/vehicle/me';
      const urlWithToken = url + '?token=' + (localStorage.getItem('JWTKey') ? localStorage.getItem('JWTKey') : '');
      axios.get(urlWithToken)
        .then(res => {
          const response = res.data;
          const data = response.data;
          setMyCars(data);
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            const errorDetail = error.response.data
            console.log(errorDetail);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }

        });
    }
  }, [userData])

  const trackVehicle = useCallback((vehicle) => {
    return () => {
      history.push({
        pathname: '/page/track',
        state: {
          plate: vehicle.vt_plate,
          platePrefix: vehicle.vt_plate_prefix,
        }
      })
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Vehicle Following</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Container>
          <Header>Your vehicle tracking</Header>
          {userData.userId ? (
              <div style={{textAlign: "center"}}>
                <ActionButton onClick={() => history.push('/page/addvehicle')}>+ Add Car</ActionButton>
              </div>
            ) :
            (
              <div style={{textAlign: "center", marginTop: "40px"}}>
                <ActionButton onClick={() => menuController.toggle()}>Please Login</ActionButton>
              </div>
            )
          }
          <ResultWrapper>
            {myCars.map((vehicle: Vehicle) => (
                <ResultCard key={vehicle.vt_id}>
                  <VehicleImage
                    src={vehicle.vehicle_image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/200px-No_image_3x4.svg.png'}/>
                  <VehicleDetail>
                    <div>{thaiType[vehicle.vehicle_type]} {thaiColor[vehicle.vehicle_color]}</div>
                    <div>ป้ายทะเบียน {vehicle.vt_plate_prefix}{vehicle.vt_plate}</div>
                    <div>ตำแหน่ง {}</div>
                  </VehicleDetail>
                  {vehicle.vehicle_id ? (
                    <TrackButton onClick={trackVehicle(vehicle)}>ดูตำแหน่ง</TrackButton>
                  ) : (
                    <TrackButton>กำลังติดตาม</TrackButton>
                  )}

                </ResultCard>
              )
            )}
          </ResultWrapper>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Follow;
