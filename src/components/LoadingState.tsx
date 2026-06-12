import { Box, CircularProgress } from '@mui/material';

const LoadingState = ({ py = 6 }: { py?: number }) => (
  <Box display="flex" justifyContent="center" alignItems="center" py={py}>
    <CircularProgress />
  </Box>
);

export default LoadingState;
