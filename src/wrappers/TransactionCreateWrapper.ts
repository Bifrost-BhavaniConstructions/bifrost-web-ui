import { TransactionTypeEnum } from "../enums/TransactionTypeEnum";
import { PlatformEnum } from "../enums/PlatformEnum";

export interface TransactionCreateWrapper {
  from?: string;
  to?: string;
  amount: number;
  remarks: string;
  transactionType: TransactionTypeEnum;
  platform: PlatformEnum;
  toMisc?: string;
  functionHall?: string;
  site?: string;
  transactionPurpose?: string;
}
