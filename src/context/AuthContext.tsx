import { createContext, useState, useCallback, type ReactNode } from 'react';
import { findCustomerByEmail } from '../api/customerApi';
import type { Customer } from '../types/customer';

const STORAGE_KEY = 'dwp_logged_in_customer';

interface AuthContextValue {
  customer: Customer | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readStoredCustomer = (): Customer | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Customer;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<Customer | null>(readStoredCustomer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const found = await findCustomerByEmail(email);
      if (!found || found.password !== password) {
        setError('Email atau password salah. Silakan coba lagi.');
        return false;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      setCustomer(found);
      return true;
    } catch {
      setError('Gagal terhubung ke server. Pastikan mock API berjalan.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setCustomer(null);
  }, []);

  return (
    <AuthContext.Provider value={{ customer, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
