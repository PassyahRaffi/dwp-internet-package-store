import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      p={3}
      bgcolor="background.default"
    >
      <Typography variant="h1" fontWeight={700} color="primary" sx={{ fontSize: { xs: 80, sm: 120 } }}>
        404
      </Typography>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Halaman Tidak Ditemukan
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </Typography>
      <Button variant="contained" disableElevation onClick={() => navigate('/')}>
        Kembali ke Dashboard
      </Button>
    </Box>
  );
};

export default NotFoundPage;
