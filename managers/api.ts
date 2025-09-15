import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

export class CustomError extends Error {
  errorCode: number;
  data?: {
    [key: string]: string[];
  };

  constructor(
    errorCode: number,
    message: string,
    data?: { [key: string]: string[] }
  ) {
    super(message);
    this.errorCode = errorCode;
    this.data = data;
  }
}

interface ApiResponse<T> {
  data?: T;
  error?: CustomError;
  message?: string;
}

interface ApiResponsePagination<T, P> {
  data?: T;
  error?: CustomError;
  message?: string;
  pagination?: P;
}

const apiUrl = Constants.expoConfig?.extra?.API_URL;

// Create an instance of axios
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    "X-App-version": Constants.expoConfig?.version || "debug",
  },
  timeout: 60000, // current timeout for both connect/data :( ... hopefully is enough for normal API requests
  // maxRedirects: 0,
  // timeoutErrorMessage: 'Request timed out',
});

// GET
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    // Axios data
    const { data } = await api.get<ApiResponse<T>>(url, config);

    // API data
    if (data.data) {
      return data.data;
    }
    // API error
    if (data.error) {
      throw handleCustomErrors(data.error);
    }

    //Retun axios data
    return data as T;
  } catch (error) {
    console.error("[Api:get] error", error);
    throw error;
  }
};

// GET PAGINATION
export const getPagination = async <T, P>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponsePagination<T, P>> => {
  try {
    // Axios data
    const { data } = await api.get<ApiResponsePagination<T, P>>(url, config);

    //console.log("data", data);
    // API data
    if (data.data && data.pagination) {
      return { data: data.data as T, pagination: data.pagination as P };
    }
    // API error
    if (data.error) {
      throw handleCustomErrors(data.error);
    }

    //Retun axios data
    return data;
  } catch (error) {
    console.error("[Api:get] error", error);
    throw error;
  }
};

// POST
export const post = async <T>(
  url: string,
  body: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const { data } = await api.post<ApiResponse<T>>(url, body, config);
    if (data.data) {
      return data.data;
    }
    if (data.error) {
      throw handleCustomErrors(data.error);
    }

    //Retun axios data
    return data as T;
  } catch (error) {
    console.error("[Api:post] error", error);
    throw error;
  }
};

// PUT
export const put = async <T>(
  url: string,
  body: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const { data } = await api.put<ApiResponse<T>>(url, body, config);
    if (data.data) {
      return data.data;
    }
    if (data.error) {
      throw handleCustomErrors(data.error);
    }

    //Retun axios data
    return data as T;
  } catch (error) {
    console.error("[Api:put] error", error);
    throw error;
  }
};

// DELETE
export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const { data } = await api.delete<ApiResponse<T>>(url, config);
    if (data.data) {
      return data.data;
    }
    if (data.error) {
      throw handleCustomErrors(data.error);
    }

    //Retun axios data
    return data as T;
  } catch (error) {
    console.error("[Api:del] error", error);
    throw error;
  }
};

// PATCH
export const patch = async <T>(
  url: string,
  body: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const { data } = await api.patch<ApiResponse<T>>(url, body, config);
    if (data.data) {
      return data.data;
    }
    if (data.error) {
      throw handleCustomErrors(data.error);
    }

    //Retun axios data
    return data as T;
  } catch (error) {
    console.error("[Api:patch] error", error);
    throw error;
  }
};

// HANDLE CUSTOM ERRORS
// trope_mc_bk/lang/en/errors.php
const handleCustomErrors = (error: CustomError) => {
  console.error("[Api:handleCustomErrors] error", error);

  switch (error.errorCode) {
    case 1: //Validation error
      throw new CustomError(error.errorCode, error.message, error.data);
    case 1308:
      throw new CustomError(error.errorCode, error.message, error.data);
    case 1309: // Daily interaction limit reached. (Quan un usuari superi el número de likes enviats, retornem el següent error)
      throw new CustomError(error.errorCode, error.message, error.data);
    case 1310: // You have no more SuperBook balance. (Books limitats, si es passa retornem error)
      throw new CustomError(error.errorCode, error.message, error.data);
    default:
      throw new Error(error.message || "Unknown error");
  }
};

// Method to set the bearer token
export const setBearerToken = (token: string | null) => {
  //console.log("[Api:setBearerToken] setting token", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
   /*  console.log(
      "[ApiService:request] ------->",
      config.method?.toUpperCase() + " " + config.baseURL + (config.url ?? "")
    ); */
    //console.log(config.headers);

    // El token ya está en memoria, gracias a setBearerToken
    return config;
  },
  (error: AxiosError) => {
    console.error(
      "[ApiService:request] error",
      error.response?.status,
      error.response?.data,
      error.code,
      error.message
    );
    return Promise.reject(error); // dejamos que el error se propague
  }
);
// Interceptor de response
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("[ApiService:response] error", error.response?.status, error.response?.data);
    return Promise.reject(error); // siempre rechazar
  }
);

const handleAPIErrors = (error: AxiosError) => {
  console.error("[Api:handleAPIErrors] error", error);
  switch (error.response?.status) {
    case 401:
      //emitGlobalEvent(GlobalEvents.SHOW_GENERIC_ERROR_MODAL, error);
      return Promise.reject(error);
    case 402:
      //TODO Fer un dialog normal  que digui hazte premium i al clicar executi el bottomsheet?
      //emitGlobalEvent(GlobalEvents.SHOW_SUBSCRIPTION_MODAL);
      return Promise.reject(error);
    case 403:
      return Promise.reject(error);
    case 422:
      return Promise.reject(error);
    case 426:
      //emitGlobalEvent(GlobalEvents.SHOW_UPGRADE_MODAL);
      return Promise.reject(error);
    case 429:
      return Promise.reject(error);
    case 503:
      //emitGlobalEvent(GlobalEvents.SHOW_MAINTENANCE_MODAL);
      return Promise.reject(error);
    default:
      //emitGlobalEvent(GlobalEvents.SHOW_GENERIC_ERROR_MODAL, error);
      return Promise.reject(error);
  }
};

export default api;
