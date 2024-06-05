import axios from "axios";
import queryString from "query-string";
import { baseURL } from "../utils";

export const AxiosConfig = () => {
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
    config.headers.Authorization = `Bearer `
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