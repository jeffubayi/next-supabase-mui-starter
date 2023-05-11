
import * as React from 'react';
import { useRouter } from "next/router";
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { IconButton, Button, AppBar, Avatar, Box, CssBaseline, Divider, GlobalStyles, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';


export default function Navbar() {
    const session = useSession()
    const router = useRouter();
    const user = useUser()
    const supabaseClient = useSupabaseClient()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <MenuItem onClick={() => router.push("/")}>
                            <Typography sx={{ minWidth: 100 }}>About</Typography>
                        </MenuItem>
                        {!session ? (<Button onClick={() => router.push("/signin")} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                            Login
                        </Button>) : (
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar src={user?.user_metadata?.avatar_url || ""} sx={{ width: 32, height: 32 }} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={user?.user_metadata?.avatar_url || ""} />
                                </ListItemAvatar>
                                <ListItemText primary={user?.user_metadata?.name} secondary={session?.user?.email || "Not signed in"} />
                            </ListItem>
                        </List>
                        <Divider />
                        <MenuItem onClick={() => router.push("/about")}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={() => supabaseClient.auth.signOut()}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}