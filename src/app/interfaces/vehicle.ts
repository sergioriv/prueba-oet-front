import { IDriver } from './driver';
import { IOwner } from './owner';

export interface IVehicle {
  id: number,
  license_plate: string,
  color: string,
  make: string,
  type: string,
  is_private: boolean,
  driver: IDriver | any,
  owner: IOwner | any
}
