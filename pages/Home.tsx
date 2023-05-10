import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useRouter } from "next/router";

const tiers = [
    {
        title: 'Components',
        subheader: 'Material UI',
        description: [
            'UI components',
            'Themes',
            'Layout',
        ],
        buttonText: 'View',
        buttonVariant: 'outlined',
    },
    {
        title: 'Authentication',
        subheader: 'Supabase',
        price: '15',
        description: [

            'Session Management',
            'User Sign Up/In',
            'Social Login',
        ],
        buttonText: 'Sign Up',
        buttonVariant: 'contained',
    },
    {
        title: 'React',
        subheader:'Nextjs',
        description: [
            'State Management',
            'Data Fetching(SSR)',
            'Error Handling',
        ],
        buttonText: 'View',
        buttonVariant: 'outlined',
    },
];

export default function Home() {
    const router = useRouter();
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
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        NeMuReSu
                    </Typography>
                    <nav>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="#"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            About
                        </Link>
                    </nav>
                    <Button onClick={()=>router.push("/")} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Nextjs + MUI + Redux + Supabase
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    Quickly build an effective react web application using this starter tools easily Based on Typescript ,Nextjs 12 , Material UI components, Redux toolkit and Supabase.

                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main" sx={{ mb: 8 }}>
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'React' ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Authentication' ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant={tier.buttonVariant as 'outlined' | 'contained'}
                                        onClick={()=>router.push("/")}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}
