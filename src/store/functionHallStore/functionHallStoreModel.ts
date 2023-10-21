import { Action, Thunk } from "easy-peasy";
import FunctionHall from "../../types/FunctionHall/FunctionHall";
import Enquiry from "../../types/FunctionHall/Enquiry";
import EnquiryType from "../../types/FunctionHall/EnquiryType";

export interface FunctionHallStoreModel {
  functionHalls: FunctionHall[];
  setFunctionHalls: Action<FunctionHallStoreModel, FunctionHall[]>;
  enquiries: Enquiry[];
  enquiryTypes: EnquiryType[];
  setEnquiries: Action<FunctionHallStoreModel, Enquiry[]>;
  setEnquiryTypes: Action<FunctionHallStoreModel, EnquiryType[]>;
  fetchFunctionHalls: Thunk<FunctionHallStoreModel, void>;
  fetchEnquiries: Thunk<FunctionHallStoreModel, void>;
  fetchEnquiryTypes: Thunk<FunctionHallStoreModel, void>;
}
