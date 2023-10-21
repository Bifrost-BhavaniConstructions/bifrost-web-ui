import httpClient from "../config/AxiosInterceptors";
import { AxiosError } from "axios";
import FunctionHall from "../types/FunctionHall/FunctionHall";

export const getAllFunctionHalls: () => Promise<FunctionHall[]> = async () => {
  try {
    const response = await httpClient.get(`/function-hall/`);
    return response.data as FunctionHall[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const addFunctionHall: (
  functionHall: FunctionHall,
) => Promise<FunctionHall> = async (functionHall: FunctionHall) => {
  try {
    const response = await httpClient.post(`/function-hall/`, functionHall);
    return response.data as FunctionHall;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
export const updateFunctionHall: (
  functionHall: FunctionHall,
) => Promise<FunctionHall> = async (functionHall: FunctionHall) => {
  try {
    const response = await httpClient.put(`/function-hall/`, functionHall);
    return response.data as FunctionHall;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
