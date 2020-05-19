import React, {useState} from 'react';
import {initialUserData, UserData} from "../components/SideMenu";

export const UserContext = React.createContext<any>({});

const UserProvider: React.FC = ({children}) => {
  const [userData, setUserData] = useState<UserData>(initialUserData);

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;