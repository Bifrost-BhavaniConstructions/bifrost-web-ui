import EnquiryType from "../types/FunctionHall/EnquiryType";
import httpClient from "../config/AxiosInterceptors";
import { AxiosError } from "axios/index";
import { CashAccount } from "../types/CashAccount/CashAccount";
import { Transaction } from "../types/CashAccount/Transaction";
import { TransactionPurpose } from "../types/CashAccount/TransactionPurpose";

export const fetchCashAccount: (
  userId: string,
) => Promise<CashAccount> = async (userId: string) => {
  try {
    const response = await httpClient.get(`/cash-account/account/${userId}`);
    return response.data as CashAccount;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const fetchUserTransactions: (
  userId: string,
) => Promise<Transaction[]> = async (userId: string) => {
  try {
    const response = await httpClient.get(
      `/cash-account/transaction/${userId}`,
    );
    return response.data as Transaction[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const fetchTransactionPurposes: () => Promise<
  TransactionPurpose[]
> = async () => {
  try {
    const response = await httpClient.get(`/cash-account/transaction-purpose`);
    return response.data as TransactionPurpose[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
