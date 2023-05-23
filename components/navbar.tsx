
import * as React from 'react';
import { useRouter } from "next/router";
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { IconButton, Switch, Button, AppBar, Avatar, Box, CssBaseline, Divider, GlobalStyles, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';

import SettingsDialog from "./accountDialog"
import { clearUserProfile } from '../redux/userProfileSlice'
import { RootState } from "../redux/types";
import { toggleColorMode } from '../redux/themeSlice';

interface ThemeState {
    darkMode: boolean;
}

export default function Navbar() {
    const session = useSession();
    const router = useRouter();
    const user = useUser();
    const isSmallScreen = useMediaQuery("(min-width:500px)");
    const supabaseClient = useSupabaseClient()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const userProfile = useSelector((state: RootState) => state.userProfile);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClickClose = () => {
        setOpenDialog(false);
    };

    const isDarkMode = useSelector((state: ThemeState) => state.darkMode);

    const handleDarkModeToggle = () => {
        dispatch(toggleColorMode());
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        router.push(`/signin`)
        supabaseClient.auth.signOut()
        dispatch(clearUserProfile())
    };

    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
                position="static"
                color="inherit"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
                        <Avatar sx={{ height: "1.5rem", width: "1.5rem" }} src="https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png" />
                        {isSmallScreen && <Typography variant="h6" color="inherit" noWrap >
                            Supabase
                        </Typography>}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <MenuItem onClick={() => router.push("/")}>
                            <Typography sx={{ minWidth: 100 }}>Home</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => router.push("/dashboard")}>
                            <Typography sx={{ minWidth: 100 }}>Dashboard</Typography>
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
                                    <Avatar src={userProfile.avatar_url ? `https://aaepbxpivppmvuaemajn.supabase.co/storage/v1/object/public/avatars/${userProfile.avatar_url}` : user?.user_metadata?.avatar_url} sx={{ width: 32, height: 32 }} />
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
                                    <Avatar src={userProfile.avatar_url ? `https://aaepbxpivppmvuaemajn.supabase.co/storage/v1/object/public/avatars/${userProfile.avatar_url}` : user?.user_metadata?.avatar_url} />
                                </ListItemAvatar>
                                <ListItemText primary={userProfile.username || user?.user_metadata?.name || "Signed in as:"} secondary={session?.user?.email || "Not signed in"} />
                            </ListItem>
                        </List>
                        <Divider />
                        <MenuItem >
                            <ListItemIcon>
                                <Brightness4Icon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText> Dark Theme</ListItemText>
                            <Switch
                                size="small"
                                edge="end"
                                checked={!isDarkMode} onChange={handleDarkModeToggle}
                                inputProps={{
                                    'aria-labelledby': 'switch-list-label-bluetooth',
                                }}
                            />
                        </MenuItem>
                        <MenuItem onClick={handleClickOpen}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <SettingsDialog
                open={openDialog}
                onClose={handleClickClose}
            />
        </React.Fragment>
    );
}