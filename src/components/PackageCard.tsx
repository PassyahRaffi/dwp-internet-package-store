import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import type { Package } from '../types/package';

interface PackageCardProps {
  pkg: Package;
  onBuy: (pkg: Package) => void;
  buying?: boolean;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(
    price,
  );

const PackageCard = ({ pkg, onBuy, buying }: PackageCardProps) => {
  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Box
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              borderRadius: 2,
              p: 1,
              display: 'flex',
            }}
          >
            <WifiIcon />
          </Box>
          <Chip label={pkg.category} size="small" variant="outlined" />
        </Stack>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {pkg.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {pkg.provider}
        </Typography>
        <Stack direction="row" spacing={2} my={1.5}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Kuota
            </Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              {pkg.quota}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Masa Aktif
            </Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              {pkg.validity}
            </Typography>
          </Box>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {pkg.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="primary" fontWeight={700}>
          {formatPrice(pkg.price)}
        </Typography>
        <Button variant="contained" disableElevation onClick={() => onBuy(pkg)} disabled={buying}>
          {buying ? 'Memproses...' : 'Beli Paket'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PackageCard;
