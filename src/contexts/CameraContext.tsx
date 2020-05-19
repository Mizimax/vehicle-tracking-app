import React, {useState} from 'react';
import {Camera} from "../Type";

export const CameraContext = React.createContext<any>({});

const CameraProvider: React.FC = ({children}) => {
  const [cameras, setCameras] = useState<Camera[]>([]);

  return (
    <CameraContext.Provider value={{cameras, setCameras}}>
      {children}
    </CameraContext.Provider>
  );
};

export default CameraProvider;