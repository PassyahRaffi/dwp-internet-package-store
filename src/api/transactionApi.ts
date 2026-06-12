import apiClient from './axios';
import type { Transaction, TransactionInput } from '../types/transaction';

export const getTransactionsByCustomer = async (customerId: string): Promise<Transaction[]> => {
  const { data } = await apiClient.get<Transaction[]>('/transactions', {
    params: { customerId, _sort: 'date', _order: 'desc' },
  });
  return data;
};

export const createTransaction = async (transaction: TransactionInput): Promise<Transaction> => {
  const { data } = await apiClient.post<Transaction>('/transactions', transaction);
  return data;
};
