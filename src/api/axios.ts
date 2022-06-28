import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { AuthResponse } from "../types";
import { getToken,  logout } from "../utils";

const axiosConfig: AxiosRequestConfig = {
  baseURL: `https://mycorsproxy-tuto.herokuapp.com/https://sweetdelivery.herokuapp.com/rest`,
};

const instance: AxiosInstance = axios.create(axiosConfig);
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token: string | null = getToken();
    if (!token) return config;
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    const tokenData = jwtDecode<AuthResponse>(token);
    const isExpired = dayjs.unix(tokenData.exp).diff(dayjs()) < 1;
    if (!isExpired) return config;

    // axios
    //   .get<string>("http://localhost:8080/rest/users/refresh", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then(console.log);
    // console.log(response);
    // if (response.status === Status.SUCCESS) {
    //   login(response.value);
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${response.value}`,
    //   };
    // }
    logout();
    window.location.reload();
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default instance;
