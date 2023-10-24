import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const TrackService = createApi({
    reducerPath: 'TrackService',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://danijel.pro/musify/api/tracks' }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        getAllTracks: builder.query({
            query: () => '',
        }),
        getOneTrack: builder.query({
            query: (id) => `/${id}`,
        }),
        searchTracks: builder.query({
            query: (query) => `search/?q=${query}`,
        }),
    }),
});

export const {
    useGetAllTracksQuery,
    useGetOneTrackQuery,
    useSearchTracksQuery
} = TrackService;


