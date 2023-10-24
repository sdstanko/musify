import { PlayerState } from '@/types/player';
import { ITrack } from '@/types/track';
import { IUser, UserState } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define the initial state using that type
const initialState: UserState = {
    user: {
        _id: '',
        userName: '',
		email: '',
        library: [],
    },
};

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.player.value

export default userSlice.reducer;
