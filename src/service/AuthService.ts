import { AuthApi } from "../api/AuthApi";
import {
  LoginRequest,
  RegisterRequest,
  Result,
  User,
  UserRole,
} from "../types";
import { Handler } from "./result";

export interface IAuthService {
  login(login_in: LoginRequest): Promise<Result<string>>;
  register(register_in: RegisterRequest): Promise<Result<string>>;
  getUserByUsername(username: string): Promise<Result<User>>;
  refreshToken(): Promise<Result<string>>;
}

export const AuthService: IAuthService = {
  async login(login_in: LoginRequest): Promise<Result<string>> {
    return await AuthApi.login(login_in)
      .then((resp) => Handler.SuccessResult(resp.data))
      .catch((err) => Handler.ErrorResult(err));
  },
  async register(register_in: RegisterRequest): Promise<Result<string>> {
    if (!register_in.appUserRoles) {
      register_in.appUserRoles = [UserRole.ROLE_CLIENT];
    }
    return await AuthApi.register(register_in)
      .then((resp) => Handler.SuccessResult(resp.data))
      .catch((err) => Handler.ErrorResult(err));
  },
  async getUserByUsername(username: string): Promise<Result<User>> {
    return await AuthApi.getUserByUsername(username)
      .then((resp) => Handler.SuccessResult(resp.data))
      .catch((err) => Handler.ErrorResult(err));
  },
  async refreshToken(): Promise<Result<string>> {
    return await AuthApi.refreshToken()
      .then((resp) => Handler.SuccessResult(resp.data))
      .catch((err) => Handler.ErrorResult(err));
  },
};
