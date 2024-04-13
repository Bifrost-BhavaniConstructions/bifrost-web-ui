import FunctionHall from "./FunctionHall";
import EnquiryType from "./EnquiryType";
import { Estimate } from "./Estimate";
import { EnquiryPayment } from "./EnquiryPayment";
import { Inventory } from "./Inventory";
import { StatStatus } from "./StatStatus";
import { FollowUp } from "./FollowUp";
import { PartOfDayEnum } from "../../enums/PartOfDayEnum";

interface Enquiry {
  _id: string;
  primaryReference: string;
  name: string;
  functionHall: FunctionHall;
  fromDate: Date;
  toDate: Date;
  estimates: Estimate[];
  secondaryReference: string;
  primaryContactNumber: number;
  pax: number;
  primaryContactName: string;
  secondaryContactNumber: number | null;
  secondaryContactName: string;
  muhurtam?: string;
  enquiryType: EnquiryType;
  partOfDay: PartOfDayEnum;
  createdAt: string;
  updatedAt: string;
  isBooking: boolean;
  isCheckedIn: boolean;
  statStatus: StatStatus;
  bookingAmount: number;
  payments: EnquiryPayment[];
  inventory: Inventory[];
  followUps: FollowUp[];
  isCheckedOut: boolean;
  isClosedEnquiry: boolean;
  isFloating?: boolean;
}
export interface EnquiryFilterWrapper {
  enquiryType: string;
}
export interface EnquiryCreateWrapper {
  _id?: string;
  primaryReference: string;
  name: string;
  functionHall: string;
  fromDate: Date;
  toDate?: Date;
  estimates: Estimate[];
  secondaryReference?: string;
  partOfDay: PartOfDayEnum;
  primaryContactNumber: number;
  muhurtam?: string;
  pax: number;
  primaryContactName: string;
  secondaryContactNumber?: number | null;
  secondaryContactName?: string;
  enquiryType: string;
  createdAt?: string;
  updatedAt?: string;
  isBooking: boolean;
  isFloating?: boolean;
}

export default Enquiry;
