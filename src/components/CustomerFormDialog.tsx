import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import type { Customer, CustomerInput } from '../types/customer';

interface CustomerFormDialogProps {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSubmit: (data: CustomerInput) => Promise<void>;
}

const emptyForm: CustomerInput = {
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  joinDate: new Date().toISOString().slice(0, 10),
};

const CustomerFormDialog = ({ open, customer, onClose, onSubmit }: CustomerFormDialogProps) => {
  const [form, setForm] = useState<CustomerInput>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (customer) {
      const { id: _id, ...rest } = customer;
      setForm(rest);
    } else {
      setForm(emptyForm);
    }
  }, [customer, open]);

  const handleChange = (field: keyof CustomerInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit(form);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = form.name.trim() !== '' && form.email.trim() !== '' && form.password.trim() !== '';

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{customer ? 'Edit Customer' : 'Tambah Customer'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Nama" value={form.name} onChange={handleChange('name')} fullWidth required />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            fullWidth
            required
          />
          <TextField label="No. Telepon" value={form.phone} onChange={handleChange('phone')} fullWidth />
          <TextField
            label="Alamat"
            value={form.address}
            onChange={handleChange('address')}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Tanggal Bergabung"
            type="date"
            value={form.joinDate}
            onChange={handleChange('joinDate')}
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" disableElevation onClick={handleSubmit} disabled={!isValid || submitting}>
          {submitting ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerFormDialog;
