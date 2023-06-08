import { UserRole } from '../enums/user-role.enum';
import { Barangay } from './barangay.model';
import { CityMun } from './city-mun.model';
import { Province } from './province.model';
import { Region } from './region.model';

export interface UserAccount {
  uid?: string;
  imgUrl?: string;
  email?: string;
  fullname: string;
  age: string;
  gender: string;
  schoolID: string;
  phoneNumber: string;
  address?: {
    region: Region;
    province: Province;
    cityMun: CityMun;
    barangay: Barangay;
  };
  course?: string;
  college?: string;
  position?: string;
  role?: UserRole;
}
