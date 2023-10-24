import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const AuthService = createApi({
    reducerPath: 'AuthService',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://danijel.pro/musify/api/auth' }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (build) => ({
        login: build.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: { userName: user.userName, password: user.password },
            }),
        }),
        check: build.query({
            query: () => ({
                url: '/check',
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
        }),
    }),
});

export const { useLoginMutation, useCheckQuery } = AuthService;
