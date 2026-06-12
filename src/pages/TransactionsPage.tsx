import { useMemo, useState } from 'react';
import { Alert, Box, Tab, Tabs } from '@mui/material';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import TransactionTable from '../components/TransactionTable';
import { useAuth } from '../hooks/useAuth';
import { useTransactions } from '../hooks/useTransactions';
import type { TransactionStatus } from '../types/transaction';

type FilterValue = TransactionStatus | 'all';

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Berhasil', value: 'success' },
  { label: 'Menunggu', value: 'pending' },
  { label: 'Gagal', value: 'failed' },
];

const TransactionsPage = () => {
  const { customer } = useAuth();
  const { transactions, loading, error } = useTransactions(customer?.id);
  const [filter, setFilter] = useState<FilterValue>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? transactions : transactions.filter((t) => t.status === filter)),
    [transactions, filter],
  );

  return (
    <Box>
      <PageHeader
        title="Riwayat Transaksi"
        subtitle="Daftar pembelian paket internet kamu."
      />

      <Tabs
        value={filter}
        onChange={(_, v) => setFilter(v)}
        sx={{ mb: 2 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {FILTERS.map(({ label, value }) => (
          <Tab key={value} label={label} value={value} />
        ))}
      </Tabs>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? <LoadingState /> : <TransactionTable transactions={filtered} />}
    </Box>
  );
};

export default TransactionsPage;
