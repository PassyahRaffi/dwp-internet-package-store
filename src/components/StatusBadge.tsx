import { Chip } from '@mui/material';
import type { TransactionStatus } from '../types/transaction';

const statusConfig: Record<TransactionStatus, { label: string; color: 'success' | 'warning' | 'error' }> = {
  success: { label: 'Berhasil', color: 'success' },
  pending: { label: 'Menunggu', color: 'warning' },
  failed: { label: 'Gagal', color: 'error' },
};

const StatusBadge = ({ status }: { status: TransactionStatus }) => {
  const config = statusConfig[status];
  return <Chip label={config.label} color={config.color} size="small" sx={{ fontWeight: 600 }} />;
};

export default StatusBadge;
