import React, {useContext} from "react";
import styled from "styled-components";
import * as _ from "lodash";
import {VehicleContext} from "../contexts/VehicleContext";
import {CameraContext} from "../contexts/CameraContext";
import {thaiColor, thaiType} from "../Type";

const BoxWrapper = styled.div`
  position: fixed;
  z-index: 999; 
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 210px;
  min-height: 200px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.16);
  padding: 10px 10px 36px;
`

const Name = styled.div`
  font-weight: 300;
  font-size: 18px;
  font-style: italic;
  text-align: center;
  margin-bottom: 5px;
`

const Image = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
`

const Content = styled.div`
  font-size: 14px;
  margin-top: 3px;
  color: #555;
`

const Close = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 3px 0;
  border-top: 1px solid #ccc;
  color: darkorange;
  cursor: pointer;
`

type VehicleDetailBoxType = {
  cameraId: number | null,
  vehicleId: number | null,
  close: any
}

const VehicleDetailBox: React.FC<VehicleDetailBoxType> = ({cameraId, vehicleId, close}) => {
  const {vehicles, setVehicles} = useContext(VehicleContext);
  const {cameras, setCameras} = useContext(CameraContext);

  let selectVehicle = _.find(vehicles, {vehicle_id: vehicleId})
  let selectCamera = _.find(cameras, {camera_id: cameraId})

  if (selectVehicle) {
    return (
      <BoxWrapper>
        <Image src={selectVehicle.vehicle_image}></Image>
        <Content>
          <div>ป้ายทะเบียน : {selectVehicle.vehicle_plate_prefix}{selectVehicle.vehicle_plate}</div>
          <div>ประเภท : {thaiType[selectVehicle.vehicle_type]}</div>
          <div>สี : {thaiColor[selectVehicle.vehicle_color]}</div>
        </Content>
        <Close onClick={close}>Close</Close>
      </BoxWrapper>
    );
  } else if (selectCamera) {
    return (
      <BoxWrapper>
        <Name>{selectCamera.camera_name}</Name>
        <Image src={selectCamera.camera_pic}></Image>
        <Content>
          <div>ละติจูด : {selectCamera.camera_lat}</div>
          <div>ลองจิจูด : {selectCamera.camera_long}</div>
        </Content>
        <Close onClick={close}>Close</Close>
      </BoxWrapper>
    );
  }

  return (
    <></>
  );
};

export default VehicleDetailBox;
