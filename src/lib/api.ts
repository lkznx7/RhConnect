import axios from "axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/dtoApi";

const URL_BASE = process.env.NEXT_PUBLIC_API_URL;

export const api  = axios.create({
  baseURL : URL_BASE,
  withCredentials : true,
})

const postLogin = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth/login", data);
  
  return response.data;
};

const postRegister = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth;register", data);
  return response.data;
};

export { postLogin, postRegister };