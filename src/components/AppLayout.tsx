import { Box, Toolbar } from '@mui/material';
import type { ReactNode } from 'react';
import Navbar from './Navbar';

const drawerWidth = 240;

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          p: { xs: 2, sm: 3 },
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
