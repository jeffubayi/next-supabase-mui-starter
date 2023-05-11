import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from "next/router";
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Profile from "../components/card";
import InviteList from "../components/list";
import { useState, useEffect } from 'react'
import { TextField, Grid, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import toast from 'react-hot-toast';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import Brightness4Icon from '@mui/icons-material/Brightness4';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

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

export default function About() {
    const supabaseClient = useSupabaseClient()
    const session = useSession()
    const user = useUser()
    const [value, setValue] = useState(0)
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState("")
    const [website, setWebsite] = useState("")
    const [avatar_url, setAvatarUrl] = useState("")
    const [checked, setChecked] = React.useState(['wifi']);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    useEffect(() => {
        getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            let { data, error, status } = await supabaseClient
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            toast.error('Error loading user data!');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string,
        website: string,
        avatar_url: string,
    }) {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            }

            let { error } = await supabaseClient.from('profiles').upsert(updates)
            if (error) throw error
            toast.success('Profile updated!');
        } catch (error) {
            toast.error('Error updating the data!');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Profile />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Profile" {...a11yProps(0)} />
                    <Tab label="Preferences" {...a11yProps(1)} />
                    <Tab label="Invites" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth size="small"
                                label="username"
                                type="text"
                                value={username || user?.user_metadata.name}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth size="small"
                                label="website"
                                type="url"
                                value={website || ''}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth size="small" label="email" type="text" value={session?.user?.email} disabled />
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <TextField fullWidth size="small" label="company name" type="text" value={session?.user?.email} disabled />
                        </Grid>
                        <Grid item xs={12} my={3} mx={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => updateProfile({ username, website, avatar_url })}
                                disabled={loading}
                            >
                                {loading ? 'Loading ...' : 'Update'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    subheader={<ListSubheader>Application preferences</ListSubheader>}
                >
                    <ListItem>
                        <ListItemIcon>
                            <Brightness4Icon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-bluetooth" primary="Dark theme" />
                        <Switch
                            edge="end"
                            onChange={handleToggle('bluetooth')}
                            checked={checked.indexOf('bluetooth') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                </List>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <InviteList />
            </TabPanel>
        </Box>
    );
}
