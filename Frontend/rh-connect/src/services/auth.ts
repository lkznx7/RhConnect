import api from "./api";
import { setAuthTokens } from "@/lib/auth";

export type LoginProfile = "CANDIDATO" | "COLABORADOR";

export interface LoginPayload {
  identifier: string;
  senha: string;
  perfil: LoginProfile;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
    perfil: "CANDIDATO" | "COLABORADOR" | "ADMINISTRADOR";
  };
}

export interface RegisterPayload {
  nomeCompleto: string;
  email: string;
  cpf: string;
  telefoneWhatsapp: string;
  senha: string;
  confirmacaoSenha: string;
  objetivoRhConnect: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  setAuthTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function register(payload: RegisterPayload): Promise<{ id: string; mensagem: string }> {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function forgotPassword(identifier: string): Promise<{ mensagem: string }> {
  const { data } = await api.post("/auth/forgot-password", { identifier });
  return data;
}

export async function resetPassword(
  token: string,
  novaSenha: string,
  confirmacaoSenha: string,
): Promise<{ mensagem: string }> {
  const { data } = await api.post("/auth/reset-password", {
    token,
    novaSenha,
    confirmacaoSenha,
  });
  return data;
}