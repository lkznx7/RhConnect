import "@testing-library/jest-dom/jest-globals";

const store = new Map<string, string>();

jest.mock("cookies-next", () => ({
  setCookie: (key: string, value: string) => { store.set(key, value); },
  getCookie: (key: string) => store.get(key),
  deleteCookie: (key: string) => { store.delete(key); },
  getCookies: () => Object.fromEntries(store),
  hasCookie: (key: string) => store.has(key),
}));
