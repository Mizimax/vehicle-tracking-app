import React, {useEffect, useState} from 'react';
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import * as _ from "lodash";
import VehicleMap from "../components/VehicleMap";
import VehicleDetailBox from "../components/VehicleDetailBox";
import {TrackProps} from "../Type";

const Track: React.FC<TrackProps> = ({location}) => {
  const [cameraId, setCameraId] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);
  const plate = _.has(location.state, 'plate') ? location.state.plate : '';
  const platePrefix = _.has(location.state, 'platePrefix') ? location.state.platePrefix : '';
  useEffect(function () {
    console.log('>> vehicleId: ', vehicleId)
  }, [vehicleId])
  const close = function () {
    setCameraId(null)
    setVehicleId(null)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>Vehicle Tracking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <VehicleDetailBox close={close} cameraId={cameraId} vehicleId={vehicleId}/>
        <VehicleMap plate={plate} platePrefix={platePrefix} selectCamera={setCameraId} selectVehicle={setVehicleId}
                    apiKey="AIzaSyBuZw-uZ7-QCzHUXdmk7JxIdZRWK6jqknE"/>
      </IonContent>
    </IonPage>
  );
};

export default Track;
