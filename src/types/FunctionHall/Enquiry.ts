import FunctionHall from "./FunctionHall";
import EnquiryType from "./EnquiryType";
import { Estimate } from "./Estimate";
import { EnquiryPayment } from "./EnquiryPayment";
import { Inventory } from "./Inventory";

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
  bookingAmount: number;
  payments: EnquiryPayment[];
  inventory: Inventory[];
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
