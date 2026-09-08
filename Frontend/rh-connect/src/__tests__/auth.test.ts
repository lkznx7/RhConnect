import {
  setAccessToken,
  setRefreshToken,
  setAuthTokens,
  getAccessToken,
  getRefreshToken,
  clearAuthTokens,
  isAuthenticated,
  getAuthHeaders,
  getAuthHeadersServer,
  AUTH_COOKIE_KEYS,
} from "@/lib/auth";

describe("auth helpers", () => {
  beforeEach(() => {
    clearAuthTokens();
  });

  it("exports correct cookie keys", () => {
    expect(AUTH_COOKIE_KEYS).toEqual({
      access: "auth_token",
      refresh: "refresh_token",
    });
  });

  it("setAccessToken and getAccessToken", () => {
    setAccessToken("abc123");
    expect(getAccessToken()).toBe("abc123");
  });

  it("setRefreshToken and getRefreshToken", () => {
    setRefreshToken("xyz789");
    expect(getRefreshToken()).toBe("xyz789");
  });

  it("setAuthTokens sets both tokens", () => {
    setAuthTokens("access-val", "refresh-val");
    expect(getAccessToken()).toBe("access-val");
    expect(getRefreshToken()).toBe("refresh-val");
  });

  it("clearAuthTokens removes both", () => {
    setAuthTokens("a", "b");
    clearAuthTokens();
    expect(getAccessToken()).toBeUndefined();
    expect(getRefreshToken()).toBeUndefined();
  });

  it("isAuthenticated reflects token presence", () => {
    expect(isAuthenticated()).toBe(false);
    setAccessToken("token");
    expect(isAuthenticated()).toBe(true);
  });

  it("getAuthHeaders returns Bearer header when token exists", () => {
    setAccessToken("my-token");
    expect(getAuthHeaders()).toEqual({ Authorization: "Bearer my-token" });
  });

  it("getAuthHeaders returns empty when no token", () => {
    clearAuthTokens();
    expect(getAuthHeaders()).toEqual({});
  });

  it("getAuthHeadersServer reads from cookie-like object", () => {
    const mockCookies = {
      get: (key: string) =>
        key === "auth_token" ? { value: "server-token" } : undefined,
    };
    expect(getAuthHeadersServer(mockCookies)).toEqual({
      Authorization: "Bearer server-token",
    });
  });

  it("getAuthHeadersServer returns empty when no token cookie", () => {
    const mockCookies = { get: () => undefined };
    expect(getAuthHeadersServer(mockCookies)).toEqual({});
  });
});
