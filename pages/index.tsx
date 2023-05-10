import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import * as React from 'react';
import { Avatar, Box, Button, CssBaseline, Grid, Link, Paper, TextField, Typography, Divider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        @ubeezy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignInSide() {
  const router = useRouter();
  const session = useSession()
  const supabase = useSupabaseClient()

  // useEffect(() => {
  //   if (session) {
  //     if (router.pathname === "/") {
  //       router.push("/flights");
  //     }
  //   }
  // }, [router, session]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    router.push("/about");
  };


  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
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
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              color="primary"
              fullWidth
              size="small"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Divider>Or sign in via</Divider>
            <Button
              type="button"
              startIcon={<GoogleIcon />}
              color="primary"
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Google
            </Button>
                <Typography variant="body2" color="text.secondary" align="center">
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Typography>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}