import { AxiosResponse } from "axios";
import { LoginRequest, RegisterRequest, User } from "../types";
import instance from "./axios";

export interface IAuthApi {
  login(login_in: LoginRequest): Promise<AxiosResponse<string>>;
  register(register_in: RegisterRequest): Promise<AxiosResponse<string>>;
  getUserByUsername(username: string): Promise<AxiosResponse<User>>;
  refreshToken(): Promise<AxiosResponse<string>>;
}

export const AuthApi: IAuthApi = {
  async login(login_in: LoginRequest): Promise<AxiosResponse<string>> {
    const route = "/users/signin";
    const formData = new FormData();
    formData.append("username", login_in.username);
    formData.append("password", login_in.password);
    return await instance.post<string>(route, formData);
  },
  async register(register_in: RegisterRequest): Promise<AxiosResponse<string>> {
    const route = "/users/signup";
    return await instance.post<string>(route, register_in);
  },
  async getUserByUsername(username: string): Promise<AxiosResponse<User>> {
    const route = `/users/findByUsername/${username}`;
    return await instance.get<User>(route);
  },
  async refreshToken(): Promise<AxiosResponse<string>> {
    const route = "/users/refresh";
    return await instance.get<string>(route);
  },
};
