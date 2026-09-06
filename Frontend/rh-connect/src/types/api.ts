// api/auth - requests
type LoginRequest = {
  email: string;
  password: string;
};

type RefreshTokenRequest = {
  refreshToken: string;
};

type RegisterRequest = {
  nomeCompleto: string;
  email: string;
  cpf: string;
  telefone?: string;
  senha: string;
};

// api/auth - responses

type RoleUser = "CANDIDATO" | "COLABORADOR" | "ADMIN";

type UserResponse = {
  id: string;
  nomeCompleto: string;
  email: string;
  role: RoleUser;
};

type AuthResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserResponse;
};

type RefreshTokenResponse = {
  refreshToken: string;
  expiresIn: number;
};
