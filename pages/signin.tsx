import { useSupabaseClient } from '@supabase/auth-helpers-react'
import * as React from 'react';
import { Avatar, Box, CssBaseline, Grid, Link, Paper, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react'
import { useTheme } from '@mui/material/styles';


export default function SignIn() {
  const supabase = useSupabaseClient()
  const theme = useTheme()

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={4} component={Paper} square>

        <Box
          sx={{
            my: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#42CD8E' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>

        <Box sx={{ mx: 6 }}>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            magicLink
            providers={['google']}
            redirectTo="/signin"
            theme={theme.palette.mode}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{
          backgroundImage: 'url(https://lh3.googleusercontent.com/Vrmz8X7tAk7W7ghz6oQ9Ik2Z95UtS6LPPR1mUYWjtTNcdMDJvelHxTgfVeWj5hRMa1iVriE0vTp3HHKNfRC8CzObwSLwGS14WPw87g=w1400-v0)',
          backgroundRepeat: 'repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

    </Grid>
  );
}