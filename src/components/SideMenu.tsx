import {IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonMenu} from "@ionic/react";
import React, {useCallback, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {LoginForm} from "../Type";
import {UserContext} from "../contexts/UserContext";
import {menuController} from "@ionic/core";

export type UserData = {
  userId: number | null,
  profileImage: string,
  fullName: string
}

export const initialUserData: UserData = {
  userId: null,
  profileImage: 'assets/images/profile.png',
  fullName: 'Authority Login'
}

export const initialLoginForm: LoginForm = {
  email: '',
  password: ''
}

const Profile = styled.img`
  margin-top: 40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`

const ErrorWrapper = styled.div`
  color: red;
  font-size: 13px;
`

const SideMenu: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>(initialLoginForm);
  const [errorMessage, setErrorMessage] = useState('');

  const {userData, setUserData} = useContext(UserContext);

  useEffect(() => {
    const url = ' http://localhost:8000/api/user/me';
    const urlWithToken = url + '?token=' + (localStorage.getItem('JWTKey') ? localStorage.getItem('JWTKey') : '');
    axios.get(urlWithToken)
      .then(res => {
        const response = res.data;
        const user = response.data;
        console.log('>> user: ', user)
        setUserData({
          ...userData,
          userId: user.user_id,
          fullName: user.name,
          profileImage: user.user_pic
        })
      })
  }, [])

  const login = useCallback(() => {
    const url = ' http://localhost:8000/api/user/login';
    const params = new URLSearchParams();
    params.append('email', loginForm.email);
    params.append('password', loginForm.password);
    axios.post(url, params)
      .then(res => {
        const response = res.data;
        const user = response.data;
        setUserData({
          ...userData,
          userId: user.user_id,
          fullName: user.name,
          profileImage: user.user_pic
        })
        localStorage.setItem('JWTKey', user.api_token);
        setTimeout(() => menuController.toggle(), 200)
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          const errorDetail = error.response.data
          setErrorMessage(errorDetail.error)
          console.log(errorDetail);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }

      });
  }, [loginForm]);

  const logout = useCallback(() => {
    localStorage.removeItem('JWTKey')
    setUserData(initialUserData);
  }, []);

  return (
    <IonMenu side="start" menuId="first" contentId="main" type="overlay">
      <IonContent class="ion-text-center">
        <Profile src={userData.profileImage}></Profile>
        <h3 style={{fontWeight: 300}}>{userData.fullName}</h3>
        {!userData.userId &&
        <form action="/api/login">
          <ErrorWrapper>{errorMessage}</ErrorWrapper>
          <IonList style={{padding: '10px'}} lines="full" className="ion-no-margin ion-no-padding">
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput type="email" value={loginForm.email}
                        onIonChange={(e: any) => setLoginForm({...loginForm, email: e.target.value})}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput type="password" value={loginForm.password}
                        onIonChange={(e: any) => setLoginForm({...loginForm, password: e.target.value})}></IonInput>
            </IonItem>
            <IonButton style={{marginTop: '10px'}} expand="full" color="primary" onClick={login}>Login</IonButton>
          </IonList>
        </form>
        }
        {userData.userId &&
        <IonButton style={{margin: '20px 10px 0'}} expand="full" color="primary" onClick={logout}>Logout</IonButton>
        }
      </IonContent>
    </IonMenu>
  )
}

export default SideMenu;