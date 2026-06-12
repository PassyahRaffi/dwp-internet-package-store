import apiClient from './axios';
import type { Customer, CustomerInput } from '../types/customer';

export const getCustomers = async (): Promise<Customer[]> => {
  const { data } = await apiClient.get<Customer[]>('/customers');
  return data;
};

export const getCustomerById = async (id: string): Promise<Customer> => {
  const { data } = await apiClient.get<Customer>(`/customers/${id}`);
  return data;
};

export const findCustomerByEmail = async (email: string): Promise<Customer | undefined> => {
  const { data } = await apiClient.get<Customer[]>('/customers', {
    params: { email },
  });
  return data[0];
};

export const createCustomer = async (customer: CustomerInput): Promise<Customer> => {
  const { data } = await apiClient.post<Customer>('/customers', customer);
  return data;
};

export const updateCustomer = async (id: string, customer: CustomerInput): Promise<Customer> => {
  const { data } = await apiClient.put<Customer>(`/customers/${id}`, customer);
  return data;
};

export const deleteCustomer = async (id: string): Promise<void> => {
  await apiClient.delete(`/customers/${id}`);
};
