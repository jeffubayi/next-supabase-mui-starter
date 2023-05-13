import * as React from 'react';
import { useMemo } from 'react';
import { DataGrid, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useGetFlightsQuery } from '../redux/hooks';
import { Typography, Paper } from '@mui/material';

interface Props {
    window?: () => Window;
}

export default function Flights(props: Props) {
    const { data, isLoading, error } = useGetFlightsQuery();
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
        <DataGrid
            sx={{ borderRadius: "1rem", bgcolor: 'background.paper'}}
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
    );
}
