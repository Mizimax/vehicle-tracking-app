import React, {useCallback, useContext, useState} from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {Container} from "./Search";
import styled from "styled-components";
import axios from "axios";
import {TrackForm} from "../Type";
import {UserContext} from "../contexts/UserContext";
import {useHistory} from "react-router";

const initialTrackForm: TrackForm = {
  vehicle_plate_prefix: '',
  vehicle_plate: ''
}

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

const PlateInput = styled(IonInput)`
  flex: 2;
  margin: 10px;
`

const InputFlex = styled.div`
  display: flex;
  align-items: center;
`

const AddVehicle: React.FC = () => {
  const [trackForm, setTrackForm] = useState<TrackForm>(initialTrackForm);
  const history = useHistory();
  const {userData, setUserData} = useContext(UserContext);

  const track = useCallback(() => {
    console.log('>> trackForm: ', trackForm)
    if (userData.userId) {
      const url = ' http://localhost:8000/api/vehicle/add';
      const urlWithToken = url + '?token=' + (localStorage.getItem('JWTKey') ? localStorage.getItem('JWTKey') : '');
      const params = new URLSearchParams();
      params.append('vehicle_plate_prefix', trackForm.vehicle_plate_prefix);
      params.append('vehicle_plate', trackForm.vehicle_plate);
      axios.post(urlWithToken, params)
        .then(res => {
          const response = res.data;
          const data = response.data;
          console.log('>> data: ', data);
          history.goBack();
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
  }, [trackForm, userData])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>Vehicle Following</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Container>
          <Header>Add vehicle to track</Header>
          <div>
            <IonItem>
              <IonLabel position="stacked">ป้ายทะเบียน</IonLabel>
              <InputFlex>
                <PlateInput placeholder="ส่วนตัวอักษร" type="text" value={trackForm.vehicle_plate_prefix}
                            onIonChange={(e: any) => setTrackForm({
                              ...trackForm,
                              vehicle_plate_prefix: e.target.value
                            })}></PlateInput>
                <div>---</div>
                <PlateInput placeholder="ส่วนตัวเลข" type="text" value={trackForm.vehicle_plate}
                            onIonChange={(e: any) => setTrackForm({
                              ...trackForm,
                              vehicle_plate: e.target.value
                            })}></PlateInput>
              </InputFlex>
            </IonItem>

          </div>
          <div style={{textAlign: "center"}}>
            <ActionButton style={{'marginTop': '20px'}} onClick={track}>ติดตามยานพาหนะคันนี้</ActionButton>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddVehicle;
