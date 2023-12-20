import { SalaryTransactionTypeEnum } from "../../enums/SalaryTransactionTypeEnum";

export interface AttendanceTransaction {
  _id: string;
  //data
  user: string;
  amount: number;
  salaryMonthYear: string;
  variableFrom: Date;
  variableTo: Date;
  transactionType: SalaryTransactionTypeEnum;
  isBalanced: boolean;
  createdAt: Date;
}
