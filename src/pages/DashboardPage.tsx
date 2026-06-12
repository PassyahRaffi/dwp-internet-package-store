import { useMemo } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PaidIcon from '@mui/icons-material/Paid';
import SummaryCard from '../components/SummaryCard';
import LoadingState from '../components/LoadingState';
import PackageCard from '../components/PackageCard';
import { useAuth } from '../hooks/useAuth';
import { useTransactions } from '../hooks/useTransactions';
import { usePackages } from '../hooks/usePackages';
import { formatPrice, formatDateLong } from '../utils/format';

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
      {/* Welcome banner */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          mb: 3,
          borderRadius: 3,
          color: 'primary.contrastText',
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Selamat datang, {customer?.name}!
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
              {customer?.email}
              {customer?.joinDate && ` · Bergabung sejak ${formatDateLong(customer.joinDate)}`}
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/packages"
            variant="contained"
            color="inherit"
            sx={{ color: 'primary.main', whiteSpace: 'nowrap', alignSelf: { xs: 'flex-start', sm: 'center' } }}
          >
            Beli Paket Baru
          </Button>
        </Stack>
      </Paper>

      {/* Stats */}
      {trxError && <Alert severity="error" sx={{ mb: 2 }}>{trxError}</Alert>}
      {trxLoading ? (
        <LoadingState py={4} />
      ) : (
        <Grid container spacing={2} mb={3}>
          {[
            { icon: <ReceiptLongIcon />, label: 'Total Transaksi', value: String(stats.total), color: 'primary.main' },
            { icon: <CheckCircleIcon />, label: 'Transaksi Berhasil', value: String(stats.success), color: 'success.main' },
            { icon: <HourglassEmptyIcon />, label: 'Transaksi Pending', value: String(stats.pending), color: 'warning.main' },
            { icon: <PaidIcon />, label: 'Total Pengeluaran', value: formatPrice(stats.totalSpending), color: 'info.main' },
          ].map((card) => (
            <Grid item key={card.label} xs={12} sm={6} md={3}>
              <SummaryCard {...card} />
            </Grid>
          ))}
        </Grid>
      )}

      <Divider sx={{ mb: 3 }} />

      {/* Recommended packages */}
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
        <LoadingState py={4} />
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
