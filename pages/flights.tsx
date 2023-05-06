import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Paper, Button } from '@mui/material';
import { useMemo } from 'react';
import { DataGrid, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import DeleteIcon from '@mui/icons-material/Logout';
import { useGetFlightsQuery } from '../redux/hooks';

interface Props {
    window?: () => Window;
}

export default function Flights(props: Props) {
    const router = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient()
    const { data, isLoading, isError,error } = useGetFlightsQuery();
    const flights = data ? data : []
    const columns = useMemo(
        () => [
            { field: 'estDepartureAirport', headerName: 'Airport', flex: 1 },
            {
                field: 'lastSeen', headerName: 'Time', flex: 1,
                valueGetter: (params: GridValueGetterParams) => {
                    return new Date(params.row.lastSeen).toLocaleString()
                },
            },
            { field: 'arrivalAirportCandidatesCount', headerName: 'Arriving', flex: 1 },
            { field: 'departureAirportCandidatesCount', headerName: 'Departing', flex: 1 },
        ], []);

    if (!user?.email) {
        router.push("/")
    }
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
                        autoHeight
                        pagination
                        rows={flights}
                        columns={columns}
                        pageSizeOptions={[5, 10, 25]}
                        loading={isLoading}
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
