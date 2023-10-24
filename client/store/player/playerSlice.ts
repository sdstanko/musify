import { PlayerState } from '@/types/player'
import { ITrack } from '@/types/track'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


// Define the initial state using that type
const initialState: PlayerState = {
    active: null,
    volume: 50,
    duration: 0,
    currentTime: 0,
    isPlaying: false,
    isShuffle: false,
    isRepeat: false,
    playbackBarValue: 0
};

export const playerSlice = createSlice({
    name: 'player',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        play: (state) => {
            state.isPlaying = true;
        },
        pause: (state) => {
            state.isPlaying = false;
        },
        setIsShuffle: (state) => {
            state.isShuffle = !state.isShuffle;
        },
        setIsRepeat: (state) => {
            state.isRepeat = !state.isRepeat;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setActive: (state, action: PayloadAction<ITrack>) => {
            state.active = action.payload;
            state.currentTime = 0;
            state.duration = 0;
        },
        setPlaybackBarValue: (state, action: PayloadAction<number>) => {
            state.playbackBarValue = action.payload;
        },
    },
});

export const {
    play,
    pause,
    setIsShuffle,
    setIsRepeat,
    setCurrentTime,
    setVolume,
    setDuration,
    setActive,
    setPlaybackBarValue,
} = playerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.player.value

export default playerSlice.reducer