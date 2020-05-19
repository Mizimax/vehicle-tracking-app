export interface Camera {
  camera_id: number,
  camera_name: string,
  camera_lat: number,
  camera_long: number,
  camera_pic: string,
  camera_vehicle_lat: number,
  camera_vehicle_long: number,
  camera_lat_diff: number,
  camera_long_diff: number
}

export interface Vehicle {
  vt_id: number,
  vehicle_id: number,
  camera_id: number,
  vehicle_name: string,
  vehicle_plate: string,
  vehicle_plate_prefix: string,
  vehicle_type: string,
  vehicle_color: string,
  vehicle_image: string,
  vehicle_datetime: string,
  vt_plate_prefix: string,
  vt_plate: string
}

export interface MapProps {
  apiKey: string,
  selectCamera: any,
  selectVehicle: any,
  plate?: string,
  platePrefix?: string
}

export interface TrackProps {
  location: any,
}

export interface FormData {
  search: string,
  search_prefix: string,
  vehicle_type: string,
  vehicle_color: string,
  camera_id: number,
}

export interface LoginForm {
  email: string,
  password: string
}

export interface TrackForm {
  vehicle_plate_prefix: string,
  vehicle_plate: string
}

export const thaiType: any = {
  car: 'รถยนต์',
  'auto rickshaw': 'รถตุ๊กๆ',
  SUV: 'รถ SUV',
  pickup: 'รถกระบะ',
  bus: 'รถบัส',
  truck: 'รถบรรทุก',
  motorcycle: 'จักรยานยนต์',
}

export const thaiColor: any = {
  red: 'สีแดง',
  blue: 'น้ำเงิน',
  white: 'สีขาว',
  black: 'สีดำ',
  yellow: 'สีเหลือง',
  green: 'สีเขียว',
  pink: 'สีชมพู',
}

