import { User } from "../User";

export interface CashAccount {
  _id: string;
  user: User;
  balance: number;
}
