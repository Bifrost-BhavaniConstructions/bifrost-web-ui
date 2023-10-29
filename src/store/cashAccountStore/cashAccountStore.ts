import { action, thunk } from "easy-peasy";
import { CashAccountStoreModel } from "./cashAccountStoreModel";
import { getAllFunctionHalls } from "../../adapters/FunctionHallAdapter";
import {
  getAllEnquiries,
  getAllEnquiryTypes,
} from "../../adapters/EnquiryAdapter";
import {
  fetchCashAccount,
  fetchTransactionPurposes,
  fetchUserTransactions,
} from "../../adapters/CashAccountAdapter";

const CashAccountStore: CashAccountStoreModel = {
  cashAccount: undefined,
  userTransactions: [],
  transactionPurposes: [],
  setCashAccount: action((state, payload) => {
    state.cashAccount = payload;
  }),
  setUserTransactions: action((state, payload) => {
    state.userTransactions = payload;
  }),
  setTransactionPurposes: action((state, payload) => {
    state.transactionPurposes = payload;
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
  fetchTransactionPurposes: thunk((actions, payload) => {
    fetchTransactionPurposes().then((response) => {
      actions.setTransactionPurposes(response);
    });
  }),
};

export default CashAccountStore;
