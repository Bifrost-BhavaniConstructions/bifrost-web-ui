import { Action, Thunk } from "easy-peasy";
import { CashAccount } from "../../types/CashAccount/CashAccount";
import { Transaction } from "../../types/CashAccount/Transaction";
import { TransactionPurpose } from "../../types/CashAccount/TransactionPurpose";

export interface CashAccountStoreModel {
  cashAccount: CashAccount | undefined;
  userTransactions: Transaction[];
  transactionPurposes: TransactionPurpose[];
  setCashAccount: Action<CashAccountStoreModel, CashAccount>;
  setUserTransactions: Action<CashAccountStoreModel, Transaction[]>;
  setTransactionPurposes: Action<CashAccountStoreModel, TransactionPurpose[]>;
  fetchCashAccount: Thunk<CashAccountStoreModel, string>;
  fetchUserTransactions: Thunk<CashAccountStoreModel, string>;
  fetchTransactionPurposes: Thunk<CashAccountStoreModel, void>;
}
