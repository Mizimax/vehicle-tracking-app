import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import SideMenu from './components/SideMenu';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import './app.css';
import CameraProvider from "./contexts/CameraContext";
import VehicleProvider from "./contexts/VehicleContext";
import Track from "./pages/Track";
import UserProvider from "./contexts/UserContext";
import AddVehicle from "./pages/AddVehicle";
import TabRoot from "./components/TabRoot";

const App: React.FC = () => {

  return (
    <IonReactRouter>
      <IonApp>
        <UserProvider>
          <SideMenu/>
          <VehicleProvider>
            <CameraProvider>
              <Route path="/page/track" component={Track}/>
              <Route path="/page/addvehicle" component={AddVehicle}/>
              <Route path="/tab" component={TabRoot}/>
              <Route path="/" render={() => <Redirect to="/tab/Home"/>}/>
            </CameraProvider>
          </VehicleProvider>
        </UserProvider>
      </IonApp>
    </IonReactRouter>
  );
}

export default App;
