import {
    pause,
    play,
    setActive,
    setCurrentTime,
    setDuration,
    setPlaybackBarValue,
    setVolume,
} from '@/store/player/playerSlice';
import { IAlbum } from '@/types/album';
import { ITrack } from '@/types/track';
import { AnyAction } from '@reduxjs/toolkit';
import React, { Dispatch } from 'react';
import randomNums from './randomNums';

export class PlayerActions {
    active: ITrack | null;
    album: IAlbum;
    volume: number;
    isPlaying: boolean;
    audio: HTMLAudioElement;
    currentTime: number;
    duration: number;
    isRepeat: boolean;
    isShuffle: boolean;
    currentTrackIndex: number | null;
    setNextTrackId: React.Dispatch<React.SetStateAction<string>>;
    setPrevTrackId: React.Dispatch<React.SetStateAction<string>>;
    setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number | null>>;
    dispatch: Dispatch<AnyAction>;

    constructor(
        active: ITrack | null,
        album: IAlbum,
        volume: number,
        isPlaying: boolean,
        audio: HTMLAudioElement,
        currentTime: number,
        duration: number,
        isRepeat: boolean,
        isShuffle: boolean,
        currentTrackIndex: number | null,
        setNextTrackId: React.Dispatch<React.SetStateAction<string>>,
        setPrevTrackId: React.Dispatch<React.SetStateAction<string>>,
        setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number | null>>,
        dispatch: Dispatch<AnyAction>,
    ) {
        this.active = active;
        this.album = album;
        this.volume = volume;
        this.isPlaying = isPlaying;
        this.audio = audio;
        this.currentTime = currentTime;
        this.duration = duration;
        this.isRepeat = isRepeat;
        this.isShuffle = isShuffle;
        this.currentTrackIndex = currentTrackIndex;
        this.setNextTrackId = setNextTrackId;
        this.setPrevTrackId = setPrevTrackId;
        this.setCurrentTrackIndex = setCurrentTrackIndex;
        this.dispatch = dispatch;
    }

    activeWatcher = () => {
        if (this.currentTime != 0) return;
        this.setAudio();
        this.dispatch(setPlaybackBarValue(0));

        if (!this.isPlaying) {
            this.playToggle();
        }
        this.audio.play();
    };

    playToggle() {
        if (!this.active) return;
        if (this.isPlaying) {
            this.audio.pause();
            this.dispatch(pause());
        } else {
            this.audio.play();
            this.dispatch(play());
        }
    }

    soundToggle = () => {
        if (this.volume > 0) {
            this.dispatch(setVolume(0));
        } else {
            this.dispatch(setVolume(50));
        }
    };

    setTimeHandler = (value: number[]) => {
        const time = Math.round((this.duration / 100) * value[0]);
        this.dispatch(setPlaybackBarValue(value[0]));
        this.dispatch(setCurrentTime(time));
        this.audio.currentTime = time;
    };

    changeActive = (track: ITrack) => {
        this.dispatch(setActive({ ...track, picture: this.album.picture }));
    };

    setCurrentTrackIndexHandler = () => {
        if (this.album && this.active) {
            this.setCurrentTrackIndex(this.album.tracks.indexOf(this.active._id));
        }
    };

    setNextTrackIdHandler = () => {
        if (this.isShuffle && this.active) {
            let randomId: number;
            do {
                [randomId] = randomNums(1, this.album.tracks.length - 1);
            } while (this.album.tracks[randomId] == this.active._id);
            this.setNextTrackId(this.album.tracks[randomId]);
        } else {
            if (
                this.currentTrackIndex !== null &&
                this.currentTrackIndex !== this.album.tracks.length - 1
            ) {
                this.setNextTrackId(this.album.tracks[this.currentTrackIndex + 1]);
            } else {
                this.setNextTrackId('');
            }
        }
    };

    setPrevTrackIdHandler = () => {
        if (this.currentTrackIndex !== null) {
            if (this.album.tracks[this.currentTrackIndex - 1] !== undefined) {
                this.setPrevTrackId(this.album.tracks[this.currentTrackIndex - 1]);
            } else {
                this.setPrevTrackId(this.album.tracks[this.currentTrackIndex]);
            }
        }
    };

    setAudio = () => {
        if (this.active) {
            this.audio.src = 'https://danijel.pro/musify/api/' + this.active.audio;
            this.audio.volume = this.volume / 100;
            this.audio.onloadedmetadata = () => {
                this.dispatch(setDuration(Math.ceil(this.audio.duration)));
            };
            this.audio.ontimeupdate = () => {
                this.dispatch(setCurrentTime(Math.ceil(this.audio.currentTime)));
            };
        }
    };

    formatSecondsToPercent = () => {
        if (this.audio?.currentTime > 0 && this.audio.duration > 0) {
            const currentValue = (this.audio.currentTime / this.audio.duration) * 100;
            const currentValueArr = ('' + currentValue).split('.');
            const formattedValue = +[currentValueArr[0], currentValueArr[1]?.[0]].join('.');
            this.dispatch(setPlaybackBarValue(formattedValue));
        }
    };

    endOfTrackActions = () => {
        if (this.currentTime >= this.duration && this.currentTime !== 0) {
            this.audio.currentTime = 0;
            this.dispatch(setPlaybackBarValue(0));
            this.dispatch(setCurrentTime(0));

            if (!this.isRepeat) {
                this.playToggle();
            }
        }
    };

    setVolumeOnAudioEl = () => {
        if (this.audio) {
            this.audio.volume = this.volume / 100;
        }
    };
}
