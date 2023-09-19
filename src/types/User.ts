import {UserRoleEnum} from "../enums/UserRoleEnum";
import BankData from "./UserSubTypes/BankData";
import SupervisorData from "./UserSubTypes/SupervisorData";
import DriverData from "./UserSubTypes/DriverData";

export interface User {
    username: string;
    password?: string;
    role: UserRoleEnum;
    name: string;
    personalMobileNumber: string;
    bankAccountPersonal: BankData;
    aadhaar: string;
    pan: string;
    nickname: string;
    dob: string;
    supervisorData?: SupervisorData;
    driverData?: DriverData;
}