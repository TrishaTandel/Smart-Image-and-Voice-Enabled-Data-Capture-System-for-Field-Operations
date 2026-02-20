import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  role: "admin" | "supervisor" | "agent";
}

interface AuthState {
  token: string | null;
  user: User | null;
  expiry: number | null;

  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setAuth: (token: string, user: User, expiry: number) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  expiry: null,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  setAuth: (token, user, expiry) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("expiry", expiry.toString());

    set({ token, user, expiry });
  },

  logout: () => {
  // clear cookie
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  // clear storage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // reset state
  set({ token: null, user: null });
}

}));
