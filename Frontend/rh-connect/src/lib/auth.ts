import { setCookie, getCookie, deleteCookie } from "cookies-next";

export const AUTH_COOKIE_KEYS = {
  access: "auth_token",
  refresh: "refresh_token",
} as const;

export function setAccessToken(token: string): void {
  setCookie(AUTH_COOKIE_KEYS.access, token, { path: "/" });
}

export function setRefreshToken(token: string): void {
  setCookie(AUTH_COOKIE_KEYS.refresh, token, { path: "/" });
}

export function setAuthTokens(accessToken: string, refreshToken: string): void {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
}

export function getAccessToken(): string | undefined {
  return getCookie(AUTH_COOKIE_KEYS.access) as string | undefined;
}

export function getRefreshToken(): string | undefined {
  return getCookie(AUTH_COOKIE_KEYS.refresh) as string | undefined;
}

export function clearAuthTokens(): void {
  deleteCookie(AUTH_COOKIE_KEYS.access, { path: "/" });
  deleteCookie(AUTH_COOKIE_KEYS.refresh, { path: "/" });
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function getAuthHeaders(): Record<string, string> {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getAuthHeadersServer(
  cookieStore: { get: (key: string) => { value: string } | undefined },
): Record<string, string> {
  const token = cookieStore.get(AUTH_COOKIE_KEYS.access)?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
