import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => (
  <Box
    display="flex"
    flexDirection={{ xs: 'column', sm: 'row' }}
    alignItems={{ sm: 'center' }}
    justifyContent="space-between"
    gap={1.5}
    mb={3}
  >
    <Box>
      <Typography variant="h5" fontWeight={700}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          {subtitle}
        </Typography>
      )}
    </Box>
    {action && <Box flexShrink={0}>{action}</Box>}
  </Box>
);

export default PageHeader;
