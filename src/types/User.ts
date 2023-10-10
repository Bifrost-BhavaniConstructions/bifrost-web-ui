import { UserRoleEnum } from "../enums/UserRoleEnum";
import BankData from "./UserSubTypes/BankData";
import SupervisorData from "./UserSubTypes/SupervisorData";
import DriverData from "./UserSubTypes/DriverData";
import { PlatformEnum } from "../enums/PlatformEnum";
import ManagerData from "./UserSubTypes/ManagerData";
import SecurityGuardSecondaryData from "./UserSubTypes/SecurityGuardSecondaryData";

export interface User {
  _id?: string;
  username: string;
  password?: string;
  role: UserRoleEnum;
  platforms: PlatformEnum[];
  name: string;
  personalMobileNumber: string;
  bankAccountPersonal: BankData;
  aadhaar: string;
  pan: string;
  nickname: string;
  dob: string;
  supervisorData?: SupervisorData;
  driverData?: DriverData;
  managerData?: ManagerData;
  securityGuardSecondaryData?: SecurityGuardSecondaryData;
}
