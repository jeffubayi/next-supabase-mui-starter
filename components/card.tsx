import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, CardMedia, Chip } from '@mui/material';
import { useUser } from '@supabase/auth-helpers-react'

export default function MediaControlCard() {
  const user = useUser()
  return (
    <Card sx={{ display: 'flex' }} elevation={0}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={user?.user_metadata?.avatar_url}
        alt="user avatar"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {user?.user_metadata?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {user?.user_metadata?.email}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Chip label="Administrator" />
        </Box>
      </Box>

    </Card>
  );
}
