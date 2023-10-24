import { ITrack } from "./track";

export interface PlayerState {
    active: null | ITrack;
    volume: number;
    duration: number;
    currentTime: number;
    isPlaying: boolean;
    isShuffle: boolean;
    isRepeat: boolean;
    playbackBarValue: number
}