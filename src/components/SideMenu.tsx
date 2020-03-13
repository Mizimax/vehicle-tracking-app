import {IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonMenu} from "@ionic/react";
import React, {useState} from "react";
import styled from "styled-components";

export interface UserData {
  userId: number | null,
  profileImage: string;
  fullName: string;
}

export const initialUserData: UserData = {
  userId: null,
  profileImage: 'assets/images/profile.png',
  fullName: 'Authority Login'
}

const Profile = styled.img`
  margin-top: 40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`

const SideMenu: React.FC = () => {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  return (
    <IonMenu side="start" menuId="first" contentId="main" type="overlay">
      <IonContent class="ion-text-center">
        <Profile src={userData.profileImage}></Profile>
        <h3 style={{fontWeight: 300}}>{userData.fullName}</h3>
        {!userData.userId &&
        <form action="/api/login">
          <IonList style={{padding: '10px'}} lines="full" className="ion-no-margin ion-no-padding">
            <IonItem>
              <IonLabel position="stacked">UserName</IonLabel>
              <IonInput></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput></IonInput>
            </IonItem>
            <IonButton style={{marginTop: '10px'}} expand="full" color="primary">Login</IonButton>
          </IonList>
        </form>
        }
        {userData.userId &&
        <IonButton style={{margin: '20px 10px 0'}} expand="full" color="primary">Logout</IonButton>
        }
      </IonContent>
    </IonMenu>
  )
}

export default SideMenu;