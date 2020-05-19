import React from 'react';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {Container} from "./Search";
import styled from "styled-components";

const Header = styled.div`
  font-weight: 300;
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`

const AddCar = styled.button`
  background-color: orange;
  color: white;
  padding: 7px 20px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 300;
`

const Accident: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Accident</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Container>
          <Header>This function is available in next version.</Header>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Accident;
