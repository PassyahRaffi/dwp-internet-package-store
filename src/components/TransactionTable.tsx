import {
  Box,
  Card,
  CardContent,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StatusBadge from './StatusBadge';
import { formatDate, formatPrice } from '../utils/format';
import type { Transaction } from '../types/transaction';

const EmptyState = () => (
  <Box py={6} textAlign="center">
    <Typography color="text.secondary">Belum ada transaksi.</Typography>
  </Box>
);

const MobileCard = ({ trx }: { trx: Transaction }) => (
  <Card variant="outlined" sx={{ borderRadius: 2 }}>
    <CardContent sx={{ pb: '12px !important' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
        <Typography fontWeight={700} fontSize={15}>
          {trx.packageName}
        </Typography>
        <StatusBadge status={trx.status} />
      </Stack>
      <Typography variant="body2" color="text.secondary" mb={1}>
        {trx.provider} · {trx.quota}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          {formatDate(trx.date)}
        </Typography>
        <Typography fontWeight={700} color="primary">
          {formatPrice(trx.price)}
        </Typography>
      </Stack>
    </CardContent>
  </Card>
);

const DesktopTable = ({ transactions }: { transactions: Transaction[] }) => (
  <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
    <Table>
      <TableHead>
        <TableRow sx={{ '& th': { fontWeight: 600, bgcolor: 'grey.50' } }}>
          <TableCell>Paket</TableCell>
          <TableCell>Provider</TableCell>
          <TableCell>Kuota</TableCell>
          <TableCell>Harga</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Tanggal</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((trx) => (
          <TableRow key={trx.id} hover>
            <TableCell sx={{ fontWeight: 600 }}>{trx.packageName}</TableCell>
            <TableCell>{trx.provider}</TableCell>
            <TableCell>{trx.quota}</TableCell>
            <TableCell>{formatPrice(trx.price)}</TableCell>
            <TableCell>
              <StatusBadge status={trx.status} />
            </TableCell>
            <TableCell>{formatDate(trx.date)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const TransactionTable = ({ transactions }: { transactions: Transaction[] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (transactions.length === 0) return <EmptyState />;

  if (isMobile) {
    return (
      <Stack spacing={1.5}>
        {transactions.map((trx) => (
          <MobileCard key={trx.id} trx={trx} />
        ))}
      </Stack>
    );
  }

  return <DesktopTable transactions={transactions} />;
};

export default TransactionTable;
