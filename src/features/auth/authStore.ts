import { create } from 'zustand';

interface User {
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  checkSession: async () => {
    // Static hosting mode — no auth backend available.
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  logout: async () => {
    // Static hosting mode — clear local state only.
    set({ user: null, isAuthenticated: false });
    window.location.href = import.meta.env.BASE_URL;
  },
}));
