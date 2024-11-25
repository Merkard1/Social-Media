/* eslint-disable no-param-reassign */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios";

import { LOCAL_STORAGE_USER } from "@/6_shared/const/localstorage";

export const $api: AxiosInstance = axios.create({
  baseURL: __API__,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem(LOCAL_STORAGE_USER) || "";
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.authorization = token;
  return config;
});

export function apiCall<T = any>(
  resource: string,
  actionOrId?: string,
  options?: AxiosRequestConfig,
  params?: Record<string, any>,
): Promise<T> {
  // Construct the URL
  let url = `/${resource}`;

  if (actionOrId) {
    url += `/${actionOrId}`;
  }

  // Merge default options with provided options
  const defaultOptions: AxiosRequestConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Ensure that 'method' is of type 'Method'
  const axiosOptions: AxiosRequestConfig = {
    ...defaultOptions,
    ...options,
  };

  // Cast 'method' to 'Method' if it's a string
  if (axiosOptions.method) {
    axiosOptions.method = axiosOptions.method.toUpperCase() as Method;
  }

  // Attach query parameters if any
  if (params && Object.keys(params).length > 0) {
    axiosOptions.params = params;
  }

  // Attach the URL to axiosOptions
  axiosOptions.url = url;

  // Return the Axios promise using 'request' method
  return $api.request<T>(axiosOptions)
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: any) => {
      if (error.response) {
        const { status, data } = error.response;
        console.error(`API Error ${status}:`, data);
        throw new Error(`API Error ${status}: ${data.message || data}`);
      } else {
        console.error("Network or Axios Error:", error);
        throw error;
      }
    });
}
// i'm tired
