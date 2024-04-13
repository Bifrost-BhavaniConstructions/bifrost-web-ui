import httpClient from "../config/AxiosInterceptors";
import { AxiosError } from "axios";
import Enquiry from "../types/FunctionHall/Enquiry";
import EnquiryType from "../types/FunctionHall/EnquiryType";

export const getAllEnquiries: () => Promise<Enquiry[]> = async () => {
  try {
    const response = await httpClient.get(`/function-hall/enquiry/`);
    return response.data as Enquiry[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const getAllEnquiryTypes: () => Promise<EnquiryType[]> = async () => {
  try {
    const response = await httpClient.get(
      `/function-hall/enquiry/enquiry-types`,
    );
    return response.data as EnquiryType[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};

export const closeEnquiry: (
  enquiryId: string,
  remark: string,
  refundAmount: number,
) => Promise<EnquiryType> = async (enquiryId, remark, refundAmount) => {
  try {
    const response = await httpClient.post(
      `/function-hall/enquiry/close-enquiry/${enquiryId}`,
      {
        reason: remark,
        refundAmount: refundAmount,
      },
    );
    return response.data as EnquiryType;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const restoreEnquiry: (
  enquiryId: string,
) => Promise<EnquiryType> = async (enquiryId) => {
  try {
    const response = await httpClient.post(
      `/function-hall/enquiry/restore-enquiry/${enquiryId}`,
    );
    return response.data as EnquiryType;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
