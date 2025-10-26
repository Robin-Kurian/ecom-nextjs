// Base API configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const apiClient = {
  get: async <T>(url: string, config?: RequestInit): Promise<{ data: T }> => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...(config?.headers || {}) },
      ...config,
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return { data };
  },

  post: async <T>(url: string, data?: unknown, config?: RequestInit): Promise<{ data: T }> => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(config?.headers || {}) },
      body: JSON.stringify(data),
      ...config,
    });
    if (!res.ok) throw new Error(await res.text());
    const responseData = await res.json();
    return { data: responseData };
  },

  put: async <T>(url: string, data?: unknown, config?: RequestInit): Promise<{ data: T }> => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(config?.headers || {}) },
      body: JSON.stringify(data),
      ...config,
    });
    if (!res.ok) throw new Error(await res.text());
    const responseData = await res.json();
    return { data: responseData };
  },

  delete: async <T>(url: string, config?: RequestInit): Promise<{ data: T }> => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", ...(config?.headers || {}) },
      ...config,
    });
    if (!res.ok) throw new Error(await res.text());
    const responseData = await res.json();
    return { data: responseData };
  },
};

// Legacy functions for backward compatibility
export async function post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(config?.headers || {}) },
    body: JSON.stringify(data),
    ...config,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function get<T>(url: string, config?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(config?.headers || {}) },
    ...config,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const endpoints = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    me: "/api/auth/me",
  },
  menu: {
    navigation: "/menu/navigation",
    groups: "/menu/groups",
    featured: "/menu/featured",
    search: "/menu/search",
  },
  products: {
    list: "/products",
    search: "/products/search",
    detail: "/products",
  },
}; 