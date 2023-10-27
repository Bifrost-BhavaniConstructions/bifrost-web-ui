import { action, thunk } from "easy-peasy";
import { CashAccountStoreModel } from "./cashAccountStoreModel";
import { getAllFunctionHalls } from "../../adapters/FunctionHallAdapter";
import {
  getAllEnquiries,
  getAllEnquiryTypes,
} from "../../adapters/EnquiryAdapter";
import {
  fetchCashAccount,
  fetchUserTransactions,
} from "../../adapters/CashAccountAdapter";

const CashAccountStore: CashAccountStoreModel = {
  cashAccount: undefined,
  userTransactions: [],
  setCashAccount: action((state, payload) => {
    state.cashAccount = payload;
  }),
  setUserTransactions: action((state, payload) => {
    state.userTransactions = payload;
  }),
  fetchCashAccount: thunk((actions, payload) => {
    fetchCashAccount(payload).then((response) => {
      actions.setCashAccount(response);
    });
  }),
  fetchUserTransactions: thunk((actions, payload) => {
    fetchUserTransactions(payload).then((response) => {
      actions.setUserTransactions(response);
    });
  }),
};

export default CashAccountStore;
