import * as React from 'react';
import { useMemo } from 'react';
import { DataGrid, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useGetFlightsQuery } from '../redux/hooks';
import { Box, Typography, Button, ListItemAvatar, Skeleton, List, ListItemText, ListItem, Avatar } from '@mui/material';
import Head from 'next/head';
import { useRouter } from "next/router";
import { useSession, useUser } from '@supabase/auth-helpers-react'
import EditIcon from '@mui/icons-material/Edit';
import SettingsDialog from "../components/accountDialog"

interface Props {
    window?: () => Window;
}

export default function Flights(props: Props) {
    const { data, isLoading, error } = useGetFlightsQuery();
    const session = useSession();
    const user = useUser();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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


    return (
        <Box sx={{ width: '100%', px: 2, py: 2 }}>
            <Head>
                <title>Dashboard | Supabase</title>
            </Head>
            <SettingsDialog
                open={open}
                onClose={handleClose}
            />
            <List sx={{ width: '100%', borderRadius: "1rem", borderColor: "#333333", mb: 1, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start" secondaryAction={<>
                    {session?.user?.email &&
                        <Button onClick={handleClickOpen} variant="outlined" size="small" startIcon={<EditIcon />} sx={{ borderRadius: "0.4rem" }}>
                            Edit
                        </Button>
                    }
                </>
                }>
                    <ListItemAvatar>
                        {session ? (<Avatar alt="Remy Sharp" src={user?.user_metadata.avatar_url} />) : (
                            <Skeleton animation="wave" variant="circular" sx={{ width: "4rem", height: "4rem", m: 1 }} />
                        )}
                    </ListItemAvatar>
                    <ListItemText
                        primary={user?.user_metadata.name || <Skeleton width="20%" />}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {session?.user?.email || <Skeleton width="60%" />}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
            <DataGrid
                sx={{ borderRadius: "1rem", bgcolor: 'background.paper' }}
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
        </Box>
    );
}
