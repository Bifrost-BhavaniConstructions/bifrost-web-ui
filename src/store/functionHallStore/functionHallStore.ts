import { action, thunk } from "easy-peasy";
import { FunctionHallStoreModel } from "./functionHallStoreModel";
import { getAllFunctionHalls } from "../../adapters/FunctionHallAdapter";
import {
  getAllEnquiries,
  getAllEnquiryTypes,
} from "../../adapters/EnquiryAdapter";

const FunctionHallStore: FunctionHallStoreModel = {
  functionHalls: [],
  setFunctionHalls: action((state, payload) => {
    state.functionHalls = payload;
  }),
  enquiries: [],
  setEnquiries: action((state, payload) => {
    state.enquiries = payload;
  }),
  enquiryTypes: [],
  setEnquiryTypes: action((state, payload) => {
    state.enquiryTypes = payload;
  }),
  fetchFunctionHalls: thunk((actions) => {
    getAllFunctionHalls().then((response) => {
      actions.setFunctionHalls(response);
    });
  }),
  fetchEnquiries: thunk((actions) => {
    getAllEnquiries().then((response) => {
      actions.setEnquiries(response);
    });
  }),
  fetchEnquiryTypes: thunk((actions) => {
    getAllEnquiryTypes().then((response) => {
      actions.setEnquiryTypes(response);
    });
  }),
};

export default FunctionHallStore;
