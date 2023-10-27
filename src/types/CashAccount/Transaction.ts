import { CashAccount } from "./CashAccount";
import { TransactionTypeEnum } from "../../enums/TransactionTypeEnum";
import { PlatformEnum } from "../../enums/PlatformEnum";

export interface Transaction {
  _id: string;
  //data
  from: CashAccount;
  to: CashAccount;
  amount: number;
  remarks: string;
  transactionType: TransactionTypeEnum;
  createdAt: Date;
  platform: PlatformEnum;
  toMisc?: string;
}
