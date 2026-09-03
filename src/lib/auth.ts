import { setCookie, getCookie, deleteCookie } from "cookies-next";

const TOKEN_KEYS = {
  access: "auth_token",
  refresh: "refresh_token",
} as const;

interface CookieOpts {
  path?: string;
  sameSite?: "lax" | "strict" | "none";
  secure?: boolean;
}

const COOKIE_OPTIONS: CookieOpts = {
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export function setAuthTokens(accessToken: string, refreshToken: string) {
  setCookie(TOKEN_KEYS.access, accessToken, COOKIE_OPTIONS);
  setCookie(TOKEN_KEYS.refresh, refreshToken, COOKIE_OPTIONS);
}

export function setAccessToken(token: string) {
  setCookie(TOKEN_KEYS.access, token, COOKIE_OPTIONS);
}

export function setRefreshToken(token: string) {
  setCookie(TOKEN_KEYS.refresh, token, COOKIE_OPTIONS);
}

export function getAccessToken(): string | undefined {
  return getCookie(TOKEN_KEYS.access) as string | undefined;
}

export function getRefreshToken(): string | undefined {
  return getCookie(TOKEN_KEYS.refresh) as string | undefined;
}

export function clearAuthTokens() {
  deleteCookie(TOKEN_KEYS.access, { path: "/" });
  deleteCookie(TOKEN_KEYS.refresh, { path: "/" });
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function getAuthHeaders(): Record<string, string> {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getAuthHeadersServer(cookies: { get: (key: string) => { value?: string } | undefined }): Record<string, string> {
  const token = cookies.get(TOKEN_KEYS.access);
  return token?.value ? { Authorization: `Bearer ${token.value}` } : {};
}

export const AUTH_COOKIE_KEYS = TOKEN_KEYS;
