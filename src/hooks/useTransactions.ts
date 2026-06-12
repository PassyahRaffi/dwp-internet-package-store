import { useEffect, useState, useCallback } from 'react';
import { getTransactionsByCustomer, createTransaction } from '../api/transactionApi';
import type { Transaction, TransactionInput } from '../types/transaction';

export const useTransactions = (customerId: string | undefined) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!customerId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getTransactionsByCustomer(customerId);
      setTransactions(data);
    } catch {
      setError('Gagal memuat riwayat transaksi.');
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = useCallback(async (transaction: TransactionInput) => {
    const created = await createTransaction(transaction);
    setTransactions((prev) => [created, ...prev]);
    return created;
  }, []);

  return { transactions, loading, error, refetch: fetchTransactions, addTransaction };
};
