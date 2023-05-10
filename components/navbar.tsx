
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function Navbar() {
    const session = useSession()
    const router = useRouter();
    const supabaseClient = useSupabaseClient()

    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        onClick={()=>router.back()}
                        sx={{ mr: 2 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        NeMuReSu
                    </Typography>
                    <nav>
                        <Typography variant="subtitle1" align="center" color="text.secondary" component="p"
                        >
                            {session?.user?.email || "Click here to sign in ->"}
                        </Typography>
                    </nav>
                    {!session ? (<Button onClick={() => router.push("/signin")} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Login
                    </Button>) : (
                        <Button onClick={() => supabaseClient.auth.signOut()} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}