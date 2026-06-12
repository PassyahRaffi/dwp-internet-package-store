import { useMemo, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Tabs, Tab } from '@mui/material';
import TransactionTable from '../components/TransactionTable';
import { useAuth } from '../hooks/useAuth';
import { useTransactions } from '../hooks/useTransactions';
import type { TransactionStatus } from '../types/transaction';

type FilterValue = TransactionStatus | 'all';

const filters: { label: string; value: FilterValue }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Berhasil', value: 'success' },
  { label: 'Menunggu', value: 'pending' },
  { label: 'Gagal', value: 'failed' },
];

const TransactionsPage = () => {
  const { customer } = useAuth();
  const { transactions, loading, error } = useTransactions(customer?.id);
  const [filter, setFilter] = useState<FilterValue>('all');

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter((t) => t.status === filter);
  }, [transactions, filter]);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Riwayat Transaksi
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Daftar pembelian paket internet kamu.
      </Typography>

      <Tabs
        value={filter}
        onChange={(_, value) => setFilter(value)}
        sx={{ mb: 2 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {filters.map((f) => (
          <Tab key={f.value} label={f.label} value={f.value} />
        ))}
      </Tabs>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : (
        <TransactionTable transactions={filteredTransactions} />
      )}
    </Box>
  );
};

export default TransactionsPage;
