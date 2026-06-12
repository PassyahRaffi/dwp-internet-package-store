import { useState } from 'react';
import { Alert, Box, Grid, Snackbar } from '@mui/material';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import PackageCard from '../components/PackageCard';
import { usePackages } from '../hooks/usePackages';
import { useTransactions } from '../hooks/useTransactions';
import { useAuth } from '../hooks/useAuth';
import type { Package } from '../types/package';

const PackagesPage = () => {
  const { packages, loading, error } = usePackages();
  const { customer } = useAuth();
  const { addTransaction } = useTransactions(customer?.id);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const handleBuy = async (pkg: Package) => {
    if (!customer) return;
    setBuyingId(pkg.id);
    try {
      await addTransaction({
        customerId: customer.id,
        packageId: pkg.id,
        packageName: pkg.name,
        provider: pkg.provider,
        quota: pkg.quota,
        price: pkg.price,
        status: 'pending',
        date: new Date().toISOString(),
      });
      setSnackbar({
        open: true,
        message: `Pembelian "${pkg.name}" berhasil dibuat dan menunggu konfirmasi.`,
        severity: 'success',
      });
    } catch {
      setSnackbar({
        open: true,
        message: 'Gagal melakukan pembelian. Silakan coba lagi.',
        severity: 'error',
      });
    } finally {
      setBuyingId(null);
    }
  };

  return (
    <Box>
      <PageHeader
        title="Paket Internet"
        subtitle="Pilih paket internet yang sesuai dengan kebutuhanmu."
      />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <LoadingState />
      ) : (
        <Grid container spacing={2}>
          {packages.map((pkg) => (
            <Grid item key={pkg.id} xs={12} sm={6} lg={4}>
              <PackageCard pkg={pkg} onBuy={handleBuy} buying={buyingId === pkg.id} />
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PackagesPage;
