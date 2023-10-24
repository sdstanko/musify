import { AlbumService } from "@/services/AlbumService";
import { AuthService } from "@/services/AuthService";
import { TrackService } from "@/services/TrackService";
import { UserService } from "@/services/UserService";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import playerSlice from "./player/playerSlice";
import userSlice from "./user/userSlice";

export const makeStore = () => configureStore({
    reducer: {
      [AlbumService.reducerPath]: AlbumService.reducer,
      [TrackService.reducerPath]: TrackService.reducer,
      [UserService.reducerPath]: UserService.reducer,
      [AuthService.reducerPath]: AuthService.reducer,
      player: playerSlice,
      user: userSlice,
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(TrackService.middleware, AlbumService.middleware, UserService.middleware, AuthService.middleware)
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });