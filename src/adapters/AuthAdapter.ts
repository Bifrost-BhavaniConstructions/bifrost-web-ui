import {AxiosError} from "axios";
import {API} from "../constants";
import httpClient from "../config/AxiosInterceptors";
import {User} from "../types/User";

export const loginUsingToken = async (token: string) => {
  try{
    const data = await httpClient.get(`${API}/auth/login-with-token`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return data.data;
  }catch (e: any){
    const axiosError = e as AxiosError;
    console.log(axiosError);
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
}


export const checkPulse = async () => {
  try{
    await httpClient.get(`${API}/auth/pulse`);
  }catch (e: any){
    const axiosError = e as AxiosError;
    console.log(axiosError)
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
}
export const loginUserWithToken: () => Promise<User> = async () => {
  try{
    const response = await httpClient.get(`${API}/auth/login-with-token`);
    return response.data as User;
  }catch (e: any){
    const axiosError = e as AxiosError;
    console.log(axiosError)
    throw new Error(JSON.stringify(axiosError.response!.data));
  }
}