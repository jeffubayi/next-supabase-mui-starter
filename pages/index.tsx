import { Auth } from '@supabase/auth-ui-react'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { useEffect } from "react";
import { supabase } from "../utility/supabaseClient";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from "next/router";
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="jeffubayi.vercel.app">
        @ubeezy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Home() {
  const router = useRouter();
  const session = useSession()
  const supabase = useSupabaseClient()

  useEffect(() => {
    if (session) {
      if (router.pathname === "/") {
        router.push("/flights");
      }
    }
  }, [router, session]);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Auth
          supabaseClient={supabase} appearance={{ theme: ThemeSupa }} magicLink providers={['google']}
          redirectTo="/" theme="light" />
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}