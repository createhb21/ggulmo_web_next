/* eslint-disable no-param-reassign */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

const createInstance = () => {
  return setInterceptors(instance);
};

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(onRequest, onRequestError);
  instance.interceptors.response.use(onResponse, onResponseError);
  return instance;
};
const onRequest = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<unknown> => {
  return Promise.reject(error);
};

const ax = createInstance();

export default ax;
