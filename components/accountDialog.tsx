import React, { useState, useEffect } from 'react'
import { useSession, useUser } from '@supabase/auth-helpers-react'
import { TextField, Grid, Button, DialogActions, Box, List, ListItem, Skeleton, ListItemIcon, ListItemText, ListSubheader, Paper, Switch, Tab, Tabs, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import Head from 'next/head';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';

import Profile from "../components/card";
import InviteList from "../components/list";
import { setUserProfile } from '../redux/userProfileSlice'
import { supabase } from "../utility/supabaseClient";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function SettingsDialog(props: SimpleDialogProps) {
    const session = useSession()
    const user = useUser()
    const dispatch = useDispatch();
    const [value, setValue] = useState(0)
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState("")
    const [company, setCompany] = useState("")
    const [website, setWebsite] = useState("")
    const [avatar_url, setAvatarUrl] = useState("")
    const { onClose, open } = props;
    const isSmallScreen = useMediaQuery("(min-width:500px)");

    const handleClose = () => {
        onClose()
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        async function getProfile() {
            try {
                setLoading(true)
                if (!user) throw new Error('No user')

                let { data, error, status } = await supabase
                    .from('profiles')
                    .select(`username, website, avatar_url,company`)
                    .eq('id', user.id)
                    .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setUsername(data.username)
                    setWebsite(data.website)
                    setAvatarUrl(data.avatar_url)
                    setCompany(data.company)
                    dispatch(setUserProfile(data))
                }
            } catch (error) {
                toast.error('Error loading user data!');
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getProfile()
    }, [user, dispatch])




    async function updateProfile({
        username,
        website,
        avatar_url,
        company,
    }: {
        username: string,
        website: string,
        avatar_url?: string,
        company: string
    }) {
        try {

            setLoading(true)
            if (!user) throw new Error('No user')

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                company,
                updated_at: new Date().toISOString(),
            }
            let { data, error } = await supabase.from('profiles').upsert(updates).select()
            if (error) throw error
            dispatch(setUserProfile(updates))
            toast.success('Profile updated successfully!');
            handleClose()

        } catch (error) {
            toast.error('Error updating the data!');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog
                fullScreen={isSmallScreen ? false : true}
                open={open}
                maxWidth="sm"
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }} color="inherit">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Box sx={{ ml: 2, flex: 1 }} >
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Account" {...a11yProps(0)} />
                                <Tab label="Invites" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{ width: '100%' }}>



                    <TabPanel value={value} index={0}>
                        <Paper sx={{ width: '100%', maxWidth: 600, py: 2, px: 1, bgcolor: 'background.default', borderRadius: "1rem" }} elevation={0}>
                            {session ? (
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 2 }}>
                                    <Grid item xs={12} md={12} justifyContent="center">
                                        <Profile
                                            onUpload={(event: React.SyntheticEvent, url: string) => {
                                                setAvatarUrl(url)
                                                updateProfile({ username, website, avatar_url: url, company })
                                            }}
                                            url={avatar_url}
                                            username={username}
                                            website={website}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="username"
                                            type="text"
                                            value={username || user?.user_metadata.name}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth size="small" label="email" type="text" value={session?.user?.email} disabled />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="website"
                                            type="url"
                                            value={website || ''}
                                            onChange={(e) => setWebsite(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} >
                                        <TextField fullWidth size="small" label="company name" type="text" value={company || ''} onChange={(e) => setCompany(e.target.value)} />
                                    </Grid>

                                </Grid>
                            ) : (<Skeleton />)}
                        </Paper>
                        <DialogActions>
                            <Button onClick={handleClose} variant="outlined" size="small"
                                fullWidth>Cancel</Button>
                            <Button autoFocus onClick={() => updateProfile({ username, website, avatar_url, company })}
                                disabled={loading}
                                size="small"
                                fullWidth
                                sx={{ color: `contrastText` }}
                                variant="contained">
                                {loading ? 'Loading ...' : 'Save Changes'}</Button>

                        </DialogActions>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <InviteList />
                    </TabPanel>
                </Box>
            </Dialog>
        </div >
    );
}