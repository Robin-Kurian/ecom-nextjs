import { post, get, endpoints } from "@/services/api/base";
import { AuthTokens } from "@/types";
import { User } from "@/types/user";

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

export async function login(username: string, password: string): Promise<AuthTokens> {
  const tokens = await post<AuthTokens>(endpoints.auth.login, { username, password });
  setTokens(tokens);
  return tokens;
}

export async function register(username: string, email: string, password: string): Promise<User> {
  return post<User>(endpoints.auth.register, { username, email, password });
}

export function logout() {
  clearTokens();
}

export function setTokens(tokens: AuthTokens) {
  localStorage.setItem(ACCESS_KEY, tokens.access);
  localStorage.setItem(REFRESH_KEY, tokens.refresh);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export async function fetchUser(): Promise<User> {
  return get<User>(endpoints.auth.me, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
} 