import { AuthValues } from '@/pages/musify/auth/[slug]';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';


export const UserService = createApi({
    reducerPath: 'UserService',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://danijel.pro/musify/api/user' }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (user) => ({
                url: '/',
                method: 'POST',
                body: user,
            }),
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/${id}`,
            }),
        }),
        libraryToggle: builder.mutation({
            query: (ids) => ({
                url: `/like`,
                method: 'POST',
                body: ids,
            }),
        }),
    }),
});

export const { useCreateUserMutation, useGetUserByIdQuery, useLibraryToggleMutation } = UserService;
