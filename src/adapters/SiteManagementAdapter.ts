import httpClient from "../config/AxiosInterceptors";
import { AxiosError } from "axios";
import { Site } from "../types/SiteManagement/Site";
import { Vehicle } from "../types/SiteManagement/Vehicle";
import { Phone } from "../types/SiteManagement/Phone";
import { Card } from "../types/SiteManagement/Card";
import {
  PurchaseRequest,
  PurchaseRequestCreateWrapper,
} from "../types/SiteManagement/PurchaseRequest";
import { Attendance } from "../types/SiteManagement/Attendance";
import { AttendanceTransaction } from "../types/SiteManagement/AttendanceTransaction";

export const getAllSites: () => Promise<Site[]> = async () => {
  try {
    const response = await httpClient.get(`/site-management/`);
    return response.data as Site[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const addSite: (site: Site) => Promise<Site> = async (site) => {
  try {
    const response = await httpClient.post(`/site-management/`, site);
    return response.data as Site;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const updateSite: (site: Site) => Promise<Site> = async (site) => {
  try {
    const response = await httpClient.put(`/site-management/`, site);
    return response.data as Site;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const deleteSite: (siteId: string) => Promise<void> = async (siteId) => {
  try {
    await httpClient.delete(`/site-management/delete/${siteId}`);
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

//Vehicles

export const getAllVehicles: () => Promise<Vehicle[]> = async () => {
  try {
    const response = await httpClient.get(`/site-management/vehicle`);
    return response.data as Vehicle[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const addVehicle: (vehicle: Vehicle) => Promise<Vehicle> = async (
  vehicle,
) => {
  try {
    const response = await httpClient.post(`/site-management/vehicle`, vehicle);
    return response.data as Vehicle;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const assignVehicle: (
  assetId: string,
  userId: string,
) => Promise<Vehicle> = async (assetId: string, userId: string) => {
  try {
    const response = await httpClient.post(`/site-management/vehicle/assign`, {
      assetId,
      userId,
    });
    return response.data as Vehicle;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const updateVehicle: (vehicle: Vehicle) => Promise<Vehicle> = async (
  vehicle,
) => {
  try {
    const response = await httpClient.put(`/site-management/vehicle`, vehicle);
    return response.data as Vehicle;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

//Phones

export const assignPhone: (
  assetId: string,
  userId: string,
) => Promise<Phone> = async (assetId: string, userId: string) => {
  try {
    const response = await httpClient.post(`/site-management/phone/assign`, {
      assetId,
      userId,
    });
    return response.data as Phone;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const getAllPhones: () => Promise<Phone[]> = async () => {
  try {
    const response = await httpClient.get(`/site-management/phone`);
    return response.data as Phone[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const addPhone: (phone: Phone) => Promise<Phone> = async (phone) => {
  try {
    const response = await httpClient.post(`/site-management/phone`, phone);
    return response.data as Phone;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const updatePhone: (phone: Phone) => Promise<Phone> = async (phone) => {
  try {
    const response = await httpClient.put(`/site-management/phone`, phone);
    return response.data as Phone;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

//Cards

export const assignCard: (
  assetId: string,
  userId: string,
) => Promise<Card> = async (assetId: string, userId: string) => {
  try {
    const response = await httpClient.post(`/site-management/card/assign`, {
      assetId,
      userId,
    });
    return response.data as Card;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

//Cards

export const getAllCards: () => Promise<Card[]> = async () => {
  try {
    const response = await httpClient.get(`/site-management/card`);
    return response.data as Card[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const addCard: (card: Card) => Promise<Phone> = async (card) => {
  try {
    const response = await httpClient.post(`/site-management/card`, card);
    return response.data as Card;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const updateCard: (card: Card) => Promise<Phone> = async (card) => {
  try {
    const response = await httpClient.put(`/site-management/card`, card);
    return response.data as Card;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

//PurchaseRequests

export const getAllMyPurchaseRequests: (
  userId: string,
) => Promise<PurchaseRequest[]> = async (userId) => {
  try {
    const response = await httpClient.get(
      `/site-management/purchase-request/created-by/${userId}`,
    );
    return response.data as PurchaseRequest[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const getAllMyPendingPurchaseRequests: (
  userId: string,
) => Promise<PurchaseRequest[]> = async (userId) => {
  try {
    const response = await httpClient.get(
      `/site-management/purchase-request/approver/${userId}`,
    );
    return response.data as PurchaseRequest[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const createPurchaseRequest: (
  purchaseRequest: PurchaseRequestCreateWrapper,
) => Promise<PurchaseRequest> = async (purchaseRequest) => {
  try {
    const response = await httpClient.post(
      `/site-management/purchase-request/`,
      purchaseRequest,
    );
    return response.data as PurchaseRequest;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const deletePurchaseRequest: (
  prID: string,
) => Promise<PurchaseRequest> = async (prID) => {
  try {
    const response = await httpClient.delete(
      `/site-management/purchase-request/${prID}`,
    );
    return response.data as PurchaseRequest;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const approvePurchaseRequest: (
  prID: string,
  data: { approvalRemarks: string; approved: boolean },
) => Promise<PurchaseRequest> = async (prID, data) => {
  try {
    const response = await httpClient.post(
      `/site-management/purchase-request/approve/${prID}`,
      data,
    );
    return response.data as PurchaseRequest;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const confirmPurchaseRequest: (
  prID: string,
  data: {
    confirmationRemarks: string;
    chequeNumber: string;
    utrNumber: string;
    confirmed: boolean;
  },
) => Promise<PurchaseRequest> = async (prID, data) => {
  try {
    const response = await httpClient.post(
      `/site-management/purchase-request/confirm/${prID}`,
      data,
    );
    return response.data as PurchaseRequest;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

//Attendance

export const createAttendance: (
  attendance: Attendance,
) => Promise<Attendance> = async (attendance) => {
  try {
    const response = await httpClient.post(
      `/site-management/attendance/`,
      attendance,
    );
    return response.data as Attendance;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const getAttendance: (
  userId: string,
) => Promise<{ date: string; title: string }[]> = async (userId) => {
  try {
    const response = await httpClient.get(
      `/site-management/attendance/six-month/${userId}`,
    );
    return response.data as { date: string; title: string }[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const addAllowanceDeduction: (
  userId: string,
  amount: number,
  isSalary: boolean,
) => Promise<void> = async (userId, amount, isSalary) => {
  try {
    await httpClient.post(`/site-management/attendance/transaction/${userId}`, {
      amount,
      isSalary,
    });
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const getPayoutLastMonth: (userId: string) => Promise<number> = async (
  userId,
) => {
  try {
    const response = await httpClient.get(
      `/site-management/attendance/payout/month/${userId}`,
    );
    return response.data as number;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const getAttendanceTransactions: (
  userId: string,
) => Promise<AttendanceTransaction[]> = async (userId) => {
  try {
    const response = await httpClient.get(
      `/site-management/attendance/transactions/${userId}`,
    );
    return response.data as AttendanceTransaction[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const getAllowanceDataByMonth: (
  userId: string,
  monthYear: string,
) => Promise<number> = async (userId, monthYear) => {
  try {
    const response = await httpClient.post(
      `/site-management/attendance/salary/advance`,
      {
        userId,
        monthYear,
      },
    );
    return response.data as number;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.status));
  }
};
export const getVariableForSelectedPeriod: (
  userId: string,
  from: string,
  to: string,
) => Promise<number> = async (userId, from, to) => {
  try {
    const response = await httpClient.get(
      `/site-management/attendance/variable?userId=${userId}&fromDate=${from}&toDate=${to}`,
    );
    return response.data as number;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.status));
  }
};

export const getVariableAdvanceForSelectedPeriod: (
  userId: string,
  from: string,
  to: string,
) => Promise<number> = async (userId, from, to) => {
  try {
    const response = await httpClient.get(
      `/site-management/attendance/variable/advance?userId=${userId}&fromDate=${from}&toDate=${to}`,
    );
    return response.data as number;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.status));
  }
};

export const paySalaryForMonth: (
  userId: string,
  monthYear: string,
  amount: number,
) => Promise<void> = async (userId, monthYear, amount) => {
  try {
    await httpClient.post(`/site-management/attendance/salary`, {
      userId,
      monthYear,
      amount,
    });
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const payVariableForPeriod: (
  userId: string,
  fromDate: string,
  toDate: string,
  amount: number,
) => Promise<void> = async (userId, fromDate, toDate, amount) => {
  try {
    await httpClient.post(`/site-management/attendance/variable`, {
      userId,
      fromDate,
      toDate,
      amount,
    });
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
