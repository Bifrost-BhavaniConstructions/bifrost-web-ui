import { User } from "../types/User";
import httpClient from "../config/AxiosInterceptors";
import { AxiosError } from "axios";

export const getAllUsers: () => Promise<User[]> = async () => {
  try {
    const response = await httpClient.get(`/users/`);
    return response.data as User[];
  } catch (e: any) {
    const axiosError = e as AxiosError;
    //console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
};
