import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import StatusBadge from './StatusBadge';
import type { Transaction } from '../types/transaction';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(
    price,
  );

const formatDate = (date: string) =>
  new Date(date).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

const TransactionTable = ({ transactions }: { transactions: Transaction[] }) => {
  if (transactions.length === 0) {
    return (
      <Box py={6} textAlign="center">
        <Typography color="text.secondary">Belum ada transaksi.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
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
};

export default TransactionTable;
