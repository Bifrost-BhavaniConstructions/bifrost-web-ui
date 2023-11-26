import BankData from "../UserSubTypes/BankData";
import { PurchaseRequestStatusEnum } from "../../enums/PurchaseRequestStatusEnum";

export interface PurchaseRequest {
  _id?: string;
  createdBy: { _id: string; name: string };
  amount: number;
  name: string;
  destinationBankAccount: BankData;
  remarks: string;
  approver: { _id: string; name: string };
  approvalRemarks?: string;
  approvedAt?: Date;
  confirmationRemarks?: string;
  confirmedAt?: Date;
  chequeNumber?: string;
  utrNumber?: string;
  status: PurchaseRequestStatusEnum;
}

export interface PurchaseRequestCreateWrapper {
  _id?: string;
  createdBy: string;
  amount: number;
  name: string;
  destinationBankAccount: BankData;
  remarks: string;
  approver: string;
}
