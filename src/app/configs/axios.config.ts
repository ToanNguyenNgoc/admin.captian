import axios from "axios";
import queryString from "query-string";
import { baseURL, storage_key } from "../utils";

interface Options {
  token?: string
}

export const AxiosConfig = (options?: Options) => {
  var axiosConfig = axios.create({
    baseURL: baseURL,
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    paramsSerializer: {
      encode: (param: string) => { },
      serialize: (params: any) => queryString.stringify(params),
      indexes: false,
    } as any,
  });
  axiosConfig.interceptors.request.use(async (config) => {
    const token = options?.token || localStorage.getItem(storage_key.auth_token)
    config.headers.Authorization = `Bearer ${token}`
    return config
  });
  axiosConfig.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw error;
    }
  );
  return axiosConfig
}