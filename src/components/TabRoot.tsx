import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Follow from "../pages/Follow";
import Accident from "../pages/Accident";
import {addCircleOutline, alertCircleOutline, carOutline, searchOutline} from "ionicons/icons";
import React from "react";

interface IAppProps {
}

const TabRoot: React.FC<IAppProps> = props => {
  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route path="/tab/:tab(Home)" component={Home} exact={true}/>
        <Route path="/tab/:tab(Search)" component={Search}/>
        <Route path="/tab/:tab(Follow)" component={Follow}/>
        <Route path="/tab/:tab(Accident)" component={Accident}/>
        <Route path="/tab" render={() => <Redirect to="/tab/Home"/>}/>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="Home" href="/tab/Home">
          <IonIcon icon={carOutline}/>
          <IonLabel>Vehicle</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Accident" href="/tab/Accident">
          <IonIcon icon={alertCircleOutline}/>
          <IonLabel>Accident</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Search" href="/tab/Search">
          <IonIcon icon={searchOutline}/>
          <IonLabel>Search</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Follow" href="/tab/Follow">
          <IonIcon icon={addCircleOutline}/>
          <IonLabel>Follow</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default TabRoot;