import React, {useState} from 'react';
import {Vehicle} from "../Type";

export const VehicleContext = React.createContext<any>({});

const VehicleProvider: React.FC = ({children}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  return (
    <VehicleContext.Provider value={{vehicles, setVehicles}}>
      {children}
    </VehicleContext.Provider>
  );
};

export default VehicleProvider;