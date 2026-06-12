import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface SummaryCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  color: string;
}

const SummaryCard = ({ icon, label, value, color }: SummaryCardProps) => (
  <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 3, height: '100%' }}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ bgcolor: color, width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 }, flexShrink: 0 }}>
        {icon}
      </Avatar>
      <Box minWidth={0}>
        <Typography variant="body2" color="text.secondary" noWrap>
          {label}
        </Typography>
        <Typography variant="h6" fontWeight={700} noWrap>
          {value}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

export default SummaryCard;
