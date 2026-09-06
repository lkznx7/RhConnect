import axios, { isCancel, AxiosError } from "axios";

const URL_BASE = process.env.NEXT_PUBLIC_API_URL

const postLogin = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${URL_BASE}/api/auth/login`,
    data
  );
  return response.data;
};

const postRegister = async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(
        `${URL_BASE}/api/auth/register`,
    data
    );
    return response.data;
}