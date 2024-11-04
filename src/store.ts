import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PaymentStore, CheckoutConfig, AuthStore } from './types';

interface CombinedStore extends PaymentStore, AuthStore {}

export const useStore = create<CombinedStore>()(
  persist(
    (set) => ({
      // Auth state
      isAuthenticated: false,
      user: null,
      loginError: null,
      
      // Auth actions
      login: async (email: string, password: string) => {
        try {
          // Simulating API call - Replace with real API
          if (email === 'admin@example.com' && password === 'admin123') {
            set({
              isAuthenticated: true,
              user: { email, name: 'Administrador' },
              loginError: null
            });
            return true;
          }
          set({ loginError: 'Credenciais inválidas' });
          return false;
        } catch (error) {
          set({ loginError: 'Erro ao fazer login' });
          return false;
        }
      },
      
      logout: () => set({ isAuthenticated: false, user: null, loginError: null }),
      
      // Payment state
      configs: [],
      token: '',
      setToken: (token) => set({ token }),
      addConfig: (config) =>
        set((state) => ({
          configs: [
            ...state.configs,
            { ...config, id: Math.random().toString(36).substring(7) },
          ],
        })),
      updateConfig: (id, config) =>
        set((state) => ({
          configs: state.configs.map((c) =>
            c.id === id ? { ...c, ...config } : c
          ),
        })),
      deleteConfig: (id) =>
        set((state) => ({
          configs: state.configs.filter((c) => c.id !== id),
        })),
    }),
    {
      name: 'pagseguro-store',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        configs: state.configs,
      }),
    }
  )
);