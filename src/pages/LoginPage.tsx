import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  Avatar,
} from '@mui/material';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const { customer, login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('passyah@example.com');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  if (customer) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim() || !password.trim()) {
      setFormError('Email dan password wajib diisi.');
      return;
    }

    const success = await login(email.trim(), password.trim());
    if (success) {
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',
        backgroundImage: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
        p: 2,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, maxWidth: 420, width: '100%', borderRadius: 4 }}>
        <Stack spacing={1} alignItems="center" mb={3}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <WifiTetheringIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" fontWeight={700}>
            DWP Internet Package Store
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Masuk untuk membeli paket internet favoritmu
          </Typography>
        </Stack>

        {(error || formError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError || error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              autoFocus
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" size="large" disableElevation disabled={loading}>
              {loading ? 'Memproses...' : 'Login'}
            </Button>
          </Stack>
        </Box>

        <Box mt={3} p={2} bgcolor="grey.100" borderRadius={2}>
          <Typography variant="caption" color="text.secondary" display="block" fontWeight={600}>
            Akun Demo:
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Email: passyah@example.com
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Password: 123456
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
