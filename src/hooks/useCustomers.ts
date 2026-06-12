import { useEffect, useState, useCallback } from 'react';
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../api/customerApi';
import type { Customer, CustomerInput } from '../types/customer';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch {
      setError('Gagal memuat daftar customer.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const addCustomer = useCallback(async (customer: CustomerInput) => {
    const created = await createCustomer(customer);
    setCustomers((prev) => [...prev, created]);
    return created;
  }, []);

  const editCustomer = useCallback(async (id: string, customer: CustomerInput) => {
    const updated = await updateCustomer(id, customer);
    setCustomers((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  }, []);

  const removeCustomer = useCallback(async (id: string) => {
    await deleteCustomer(id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return {
    customers,
    loading,
    error,
    refetch: fetchCustomers,
    addCustomer,
    editCustomer,
    removeCustomer,
  };
};
