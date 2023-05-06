import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FlightData } from "./types"

export const openSkyApi = createApi({
    reducerPath: 'openSkyApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://opensky-network.org/api' }),
    tagTypes: ['Flights'],
    endpoints: builder => ({
        getFlights: builder.query<FlightData[], void>({
            query: () => 'flights/all?begin=1517227200&end=1517230800',
            providesTags: ['Flights'],
        }),
    }),
});

export const {
    useGetFlightsQuery
} = openSkyApi;