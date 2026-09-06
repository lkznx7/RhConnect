// api/auth - requests
export type LoginRequest = {
  email: string;
  password: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type RegisterRequest = {
  nomeCompleto: string;
  email: string;
  cpf: string;
  telefone?: string;
  senha: string;
};

// api/auth - responses

export type RoleUser = "CANDIDATO" | "COLABORADOR" | "ADMIN";

export type UserResponse = {
  id: string;
  nomeCompleto: string;
  email: string;
  role: RoleUser;
};

export type AuthResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserResponse;
};

export type RefreshTokenResponse = {
  refreshToken: string;
  expiresIn: number;
};


