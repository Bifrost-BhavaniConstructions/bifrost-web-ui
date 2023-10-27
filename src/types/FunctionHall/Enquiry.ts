import FunctionHall from "./FunctionHall";
import EnquiryType from "./EnquiryType";
import { Estimate } from "./Estimate";
import { EnquiryPayment } from "./EnquiryPayment";
import { Inventory } from "./Inventory";
import { StatStatus } from "./StatStatus";
import { FollowUp } from "./FollowUp";

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
  primaryContactName: string;
  secondaryContactNumber: number | null;
  secondaryContactName: string;
  enquiryType: EnquiryType;
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
  primaryContactNumber: number;
  primaryContactName: string;
  secondaryContactNumber?: number | null;
  secondaryContactName?: string;
  enquiryType: string;
  createdAt?: string;
  updatedAt?: string;
  isBooking: boolean;
}

export default Enquiry;
