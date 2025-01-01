import React from 'react';
import { Box, Typography } from '@mui/material';

const Statistics = ({ completedCount }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        今日完成番茄数：{completedCount}
      </Typography>
    </Box>
  );
};

export default Statistics; 