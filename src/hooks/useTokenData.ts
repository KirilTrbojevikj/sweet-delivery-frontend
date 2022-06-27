import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../types";
import { getToken } from "../utils";
import jwtDecode from "jwt-decode";

export const useTokenData = () => {
  const navigate = useNavigate();
  const token = getToken();
  if (!token) {
    navigate("/login");
    return null;
  }

  const tokenData = jwtDecode<AuthResponse>(token);

  return tokenData as AuthResponse;
};
