import { Action, Thunk } from "easy-peasy";
import { CashAccount } from "../../types/CashAccount/CashAccount";
import { Transaction } from "../../types/CashAccount/Transaction";

export interface CashAccountStoreModel {
  cashAccount: CashAccount | undefined;
  userTransactions: Transaction[];
  setCashAccount: Action<CashAccountStoreModel, CashAccount>;
  setUserTransactions: Action<CashAccountStoreModel, Transaction[]>;
  fetchCashAccount: Thunk<CashAccountStoreModel, string>;
  fetchUserTransactions: Thunk<CashAccountStoreModel, string>;
}
