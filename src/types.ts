export interface CheckoutConfig {
  id: string;
  title: string;
  description: string;
  amount: number;
  backgroundColor: string;
  imageUrl: string;
  token: string;
}

export interface PaymentStore {
  configs: CheckoutConfig[];
  addConfig: (config: Omit<CheckoutConfig, 'id'>) => void;
  updateConfig: (id: string, config: Partial<CheckoutConfig>) => void;
  deleteConfig: (id: string) => void;
  token: string;
  setToken: (token: string) => void;
}

export interface User {
  email: string;
  name: string;
}

export interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  loginError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}