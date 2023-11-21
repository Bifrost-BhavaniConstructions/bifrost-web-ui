import httpClient from "../config/AxiosInterceptors";
import { AxiosError } from "axios";
import { Site } from "../types/SiteManagement/Site";
import { Vehicle } from "../types/SiteManagement/Vehicle";
import { Phone } from "../types/SiteManagement/Phone";
import { Card } from "../types/SiteManagement/Card";

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
