import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const AlbumService = createApi({
    reducerPath: 'AlbumService',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://danijel.pro/musify/api/albums' }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (build) => ({
        getAllAlbums: build.query({
            query: () => '',
        }),
        getOneAlbum: build.query({
            query: (id) => `/${id}`,
        }),
        getRandomAlbums: build.query({
            query: () => `/random`,
        }),
        createAlbum: build.mutation({
            query: (album) => ({
                url: '/',
                method: 'POST',
                body: album,
            }),
        }),
    }),
});

export const { useGetAllAlbumsQuery, useGetOneAlbumQuery, useGetRandomAlbumsQuery, useCreateAlbumMutation } = AlbumService;
