import React, {useState} from 'react';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {useHistory} from "react-router-dom";
import Search from '../components/Search';
import VehicleMap from "../components/VehicleMap";
import VehicleDetailBox from "../components/VehicleDetailBox";

const Home: React.FC = () => {
  const [cameraId, setCameraId] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);
  const history = useHistory();
  const close = function () {
    setCameraId(null)
    setVehicleId(null)
  }
  const focusSearch = function () {
    history.push('/tab/search')
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Vehicle Tracking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Search OnFocus={focusSearch}/>

        <VehicleDetailBox close={close} cameraId={cameraId} vehicleId={vehicleId}/>
        <VehicleMap selectCamera={setCameraId} selectVehicle={setVehicleId}
                    apiKey="AIzaSyBuZw-uZ7-QCzHUXdmk7JxIdZRWK6jqknE"/>

      </IonContent>
    </IonPage>
  );
};

export default Home;
