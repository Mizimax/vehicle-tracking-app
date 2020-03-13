import React from 'react';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import Search from '../components/Search';
import VehicleMap from "../components/VehicleMap";

const Home: React.FC = () => {

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
        <Search/>
        <VehicleMap apiKey="AIzaSyBC_-Zk8b_DZQh-bdmatbUn0cV-3jPiKoY"/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
