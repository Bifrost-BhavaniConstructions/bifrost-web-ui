import axios from "axios";
import {API} from "../constants";

const httpClient = axios.create({
    baseURL: API,
});

httpClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

export default httpClient;