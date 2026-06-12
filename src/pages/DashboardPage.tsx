import { useMemo } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Stack,
  CircularProgress,
  Alert,
  Button,
  Divider,
} from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PaidIcon from '@mui/icons-material/Paid';
import PackageCard from '../components/PackageCard';
import { useAuth } from '../hooks/useAuth';
import { useTransactions } from '../hooks/useTransactions';
import { usePackages } from '../hooks/usePackages';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(
    price,
  );

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const SummaryCard = ({ icon, label, value, color }: SummaryCardProps) => (
  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>{icon}</Avatar>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          {value}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

const DashboardPage = () => {
  const { customer } = useAuth();
  const navigate = useNavigate();
  const { transactions, loading: trxLoading, error: trxError } = useTransactions(customer?.id);
  const { packages, loading: pkgLoading, error: pkgError } = usePackages();

  const stats = useMemo(() => {
    const total = transactions.length;
    const success = transactions.filter((t) => t.status === 'success').length;
    const pending = transactions.filter((t) => t.status === 'pending').length;
    const totalSpending = transactions
      .filter((t) => t.status === 'success')
      .reduce((sum, t) => sum + t.price, 0);
    return { total, success, pending, totalSpending };
  }, [transactions]);

  const recommendedPackages = useMemo(() => packages.slice(0, 3), [packages]);

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          color: 'primary.contrastText',
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} justifyContent="space-between">
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Selamat datang, {customer?.name}!
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              {customer?.email} · Bergabung sejak{' '}
              {customer?.joinDate ? new Date(customer.joinDate).toLocaleDateString('id-ID', { dateStyle: 'long' }) : '-'}
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/packages"
            variant="contained"
            color="inherit"
            sx={{ color: 'primary.main', whiteSpace: 'nowrap' }}
          >
            Beli Paket Baru
          </Button>
        </Stack>
      </Paper>

      {trxError && <Alert severity="error" sx={{ mb: 2 }}>{trxError}</Alert>}

      {trxLoading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard icon={<ReceiptLongIcon />} label="Total Transaksi" value={String(stats.total)} color="primary.main" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard icon={<CheckCircleIcon />} label="Transaksi Berhasil" value={String(stats.success)} color="success.main" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard icon={<HourglassEmptyIcon />} label="Transaksi Pending" value={String(stats.pending)} color="warning.main" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard icon={<PaidIcon />} label="Total Pengeluaran" value={formatPrice(stats.totalSpending)} color="info.main" />
          </Grid>
        </Grid>
      )}

      <Divider sx={{ mb: 3 }} />

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={700}>
          Rekomendasi Paket Untukmu
        </Typography>
        <Button component={RouterLink} to="/packages" size="small">
          Lihat Semua
        </Button>
      </Stack>

      {pkgError && <Alert severity="error" sx={{ mb: 2 }}>{pkgError}</Alert>}

      {pkgLoading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {recommendedPackages.map((pkg) => (
            <Grid item key={pkg.id} xs={12} sm={6} md={4}>
              <PackageCard pkg={pkg} onBuy={() => navigate('/packages')} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DashboardPage;
