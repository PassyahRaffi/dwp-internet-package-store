import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ConfirmDialog from '../components/ConfirmDialog';
import CustomerFormDialog from '../components/CustomerFormDialog';
import { useCustomers } from '../hooks/useCustomers';
import { formatDateShort } from '../utils/format';
import type { Customer, CustomerInput } from '../types/customer';

type SnackbarState = { open: boolean; message: string; severity: 'success' | 'error' };

const SNACKBAR_CLOSED: SnackbarState = { open: false, message: '', severity: 'success' };

const CustomersPage = () => {
  const { customers, loading, error, addCustomer, editCustomer, removeCustomer } = useCustomers();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Customer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>(SNACKBAR_CLOSED);

  const showSnackbar = (message: string, severity: 'success' | 'error') =>
    setSnackbar({ open: true, message, severity });

  const handleOpenAdd = () => { setEditTarget(null); setDialogOpen(true); };
  const handleOpenEdit = (c: Customer) => { setEditTarget(c); setDialogOpen(true); };

  const handleSubmit = async (data: CustomerInput) => {
    try {
      if (editTarget) {
        await editCustomer(editTarget.id, data);
        showSnackbar('Customer berhasil diperbarui.', 'success');
      } else {
        await addCustomer(data);
        showSnackbar('Customer baru berhasil ditambahkan.', 'success');
      }
    } catch {
      showSnackbar('Gagal menyimpan data customer.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const name = deleteTarget.name;
    try {
      await removeCustomer(deleteTarget.id);
      showSnackbar(`Customer "${name}" berhasil dihapus.`, 'success');
    } catch {
      showSnackbar('Gagal menghapus customer.', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <Box>
      <PageHeader
        title="Customers"
        subtitle="Kelola data pelanggan DWP Internet Package Store."
        action={
          <Button variant="contained" disableElevation startIcon={<AddIcon />} onClick={handleOpenAdd}>
            Tambah Customer
          </Button>
        }
      />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <LoadingState />
      ) : (
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3, overflowX: 'auto' }}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 600, bgcolor: 'grey.50' } }}>
                <TableCell>Nama</TableCell>
                <TableCell>Email</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>No. Telepon</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Alamat</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Bergabung</TableCell>
                <TableCell align="center">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{customer.phone}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{customer.address}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    {formatDateShort(customer.joinDate)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => handleOpenEdit(customer)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => setDeleteTarget(customer)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CustomerFormDialog
        open={dialogOpen}
        customer={editTarget}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Hapus Customer"
        message={`Apakah kamu yakin ingin menghapus customer "${deleteTarget?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(SNACKBAR_CLOSED)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomersPage;
