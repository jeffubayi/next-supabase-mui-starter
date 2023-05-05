import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Paper, Button } from '@mui/material';
import { useMemo, useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from "axios";
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import DeleteIcon from '@mui/icons-material/Logout';

type FlightData = {
    icao24: string;
    callsign: string | null;
    arrivalAirportCandidatesCount: string | null;
    departureAirportCandidatesCount: string | null;
    estDepartureAirport: string | null;
    lastSeen: Date;
    firstSeen: Date;
};

interface Props {
    window?: () => Window;
}


export default function DrawerAppBar(props: Props) {
    const { window } = props;
    const [flights, setFlights] = useState<FlightData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient()
    console.log(`user`, user)
    const columns = useMemo(
        () => [
            { field: 'estDepartureAirport', headerName: 'Airport', flex: 1 },
            { field: 'lastSeen', headerName: 'Time', flex: 1 },
            { field: 'arrivalAirportCandidatesCount', headerName: 'Arriving', flex: 1 },
            { field: 'departureAirportCandidatesCount', headerName: 'Departing', flex: 1 },
        ], []);

    useEffect(() => {
        // Fetch data from openSkyApi
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://opensky-network.org/api/flights/all?begin=1517227200&end=1517230800"
                );

                response?.data && setLoading(false)
                setFlights(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);



    const handleLogOut = () => {
        router.push("/")
        supabaseClient.auth.signOut()
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, color: '#fff', display: { sm: 'block' } }}
                    >
                        OpenSkyAPI flights
                    </Typography>

                    <Box sx={{ display: { sm: 'block' } }}>
                        <Button startIcon={<DeleteIcon />} variant="outlined" sx={{ color: '#fff' }} onClick={handleLogOut}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ px: 4, width: "100%", height: "80%", backgroundColor: "#FAFAFA" }}>
                <Toolbar />
                <p>
                    Welcome {user?.email}
                </p>
                <Paper sx={{ background: "#fff", borderRadius: "10px" }}>
                    <DataGrid
                        pagination
                        rows={flights}
                        columns={columns}
                        pageSizeOptions={[5, 10, 25]}
                        loading={loading}
                        getRowId={(row) => row?.icao24}
                        components={{ Toolbar: GridToolbar }}
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10, page: 0 },
                            },
                        }}
                    />
                </Paper>
            </Box>
        </Box>
    );
}
