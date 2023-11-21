import { CashAccount } from "./CashAccount";
import { TransactionTypeEnum } from "../../enums/TransactionTypeEnum";
import { PlatformEnum } from "../../enums/PlatformEnum";
import { TransactionPurpose } from "./TransactionPurpose";

export interface Transaction {
  _id: string;
  //data
  from: CashAccount;
  to: CashAccount;
  amount: number;
  fromBalance: number;
  toBalance: number;
  remarks: string;
  transactionType: TransactionTypeEnum;
  createdAt: Date;
  platform: PlatformEnum;
  toMisc?: string;
  functionHall?: string;
  transactionPurpose: TransactionPurpose;
  site?: { name: string };
}
