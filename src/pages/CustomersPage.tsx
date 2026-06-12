import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomerFormDialog from '../components/CustomerFormDialog';
import { useCustomers } from '../hooks/useCustomers';
import type { Customer, CustomerInput } from '../types/customer';

const CustomersPage = () => {
  const { customers, loading, error, addCustomer, editCustomer, removeCustomer } = useCustomers();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingCustomer(null);
    setDialogOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: CustomerInput) => {
    setActionError(null);
    try {
      if (editingCustomer) {
        await editCustomer(editingCustomer.id, data);
      } else {
        await addCustomer(data);
      }
    } catch {
      setActionError('Gagal menyimpan data customer.');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionError(null);
    try {
      await removeCustomer(deleteTarget.id);
    } catch {
      setActionError('Gagal menghapus customer.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Customers
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kelola data pelanggan DWP Internet Package Store.
          </Typography>
        </Box>
        <Button variant="contained" disableElevation startIcon={<AddIcon />} onClick={handleAdd}>
          Tambah Customer
        </Button>
      </Stack>

      {(error || actionError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {actionError || error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>No. Telepon</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Alamat</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Bergabung</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{customer.address}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    {new Date(customer.joinDate).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleEdit(customer)}>
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
        customer={editingCustomer}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Hapus Customer</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah kamu yakin ingin menghapus customer "{deleteTarget?.name}"? Tindakan ini tidak dapat dibatalkan.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteTarget(null)}>Batal</Button>
          <Button color="error" variant="contained" disableElevation onClick={handleDelete}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomersPage;
