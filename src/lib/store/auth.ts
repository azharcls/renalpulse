import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  facilityName: string;
  role: 'superadmin' | 'admin' | 'staff' | 'patient';
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (email: string, password: string, facilityName: string) => Promise<void>;
  logout: () => void;
}

// Predefined superadmin account
const SUPERADMIN = {
  id: 'superadmin-1',
  email: 'kaz',
  password: '12345678',
  facilityName: 'System Administration',
  role: 'superadmin' as const,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (username: string, password: string) => {
        set({ isLoading: true });
        try {
          // Check for superadmin credentials
          if (username === SUPERADMIN.email && password === SUPERADMIN.password) {
            const { password: _, ...superadminUser } = SUPERADMIN;
            set({ user: superadminUser, isAuthenticated: true });
            return;
          }

          // Mock staff login (in a real app, this would be an API call)
          const mockUser = {
            id: '1',
            email: username,
            facilityName: 'Demo Facility',
            role: 'staff' as const,
          };
          set({ user: mockUser, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },
      register: async (email: string, password: string, facilityName: string) => {
        set({ isLoading: true });
        try {
          const mockUser = {
            id: '1',
            email,
            facilityName,
            role: 'admin' as const,
          };
          set({ user: mockUser, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);