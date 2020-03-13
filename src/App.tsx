import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {addCircleOutline, homeOutline, searchOutline} from 'ionicons/icons';
import Home from './pages/Home';
import Search from './pages/Search';
import Follow from './pages/Follow';
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

const App: React.FC = () => {


  return (
    <IonApp>
      <IonReactRouter>
        <SideMenu/>
        <IonTabs>
          <IonRouterOutlet id="main">
            <Route path="/home" component={Home} exact={true}/>
            <Route path="/search" component={Search} exact={true}/>
            <Route path="/follow" component={Follow}/>
            <Route path="/" render={() => <Redirect to="/home"/>} exact={true}/>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Vehicle Tracking" href="/home">
              <IonIcon icon={homeOutline}/>
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Vehicle Searching" href="/search">
              <IonIcon icon={searchOutline}/>
              <IonLabel>Search</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Vehicle Following" href="/follow">
              <IonIcon icon={addCircleOutline}/>
              <IonLabel>Follow</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
