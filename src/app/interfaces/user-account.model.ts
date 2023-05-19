import { UserRole } from '../enums/user-role.enum';

export interface UserAccount {
  uid?: string;
  imgUrl?: string;
  email?: string;
  fullname: string;
  age: string;
  gender: string;
  schoolID: string;
  phoneNumber: string;
  address: string;
  course: string;
  college: string;
  role: UserRole;
}
