import { useState } from 'react';
import { Box, Grid, Typography, CircularProgress, Alert, Snackbar } from '@mui/material';
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
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

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
      setSnackbar({ open: true, message: `Pembelian "${pkg.name}" berhasil dibuat dan menunggu konfirmasi.`, severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Gagal melakukan pembelian. Silakan coba lagi.', severity: 'error' });
    } finally {
      setBuyingId(null);
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Paket Internet
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Pilih paket internet yang sesuai dengan kebutuhanmu.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {packages.map((pkg) => (
            <Grid item key={pkg.id} xs={12} sm={6} md={4}>
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
