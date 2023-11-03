import { useAppSelector } from '@/store/hooks';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Range } from 'react-range';
import { useDispatch } from 'react-redux';
import IconBtn from '../UI/IconBtn/IconBtn';
import styles from './Player.module.css';
import { setIsShuffle, setIsRepeat, setVolume } from '../../store/player/playerSlice';
import { formatTime } from '@/utils/formatTime';
import { useGetOneAlbumQuery } from '@/services/AlbumService';
import { useGetOneTrackQuery } from '@/services/TrackService';
import { PlayerActions } from '@/utils/playerActions';

let audio: HTMLAudioElement;
const Player: FC = () => {
    const [nextTrackId, setNextTrackId] = useState('');
    const [prevTrackId, setPrevTrackId] = useState('');
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
    const dispatch = useDispatch();

    const {
        isPlaying,
        isShuffle,
        isRepeat,
        duration,
        currentTime,
        volume,
        active,
        playbackBarValue,
    } = useAppSelector((state) => state.player);

    const { data: album } = useGetOneAlbumQuery(active?.album, { skip: !active?.album });
    const { data: nextTrack } = useGetOneTrackQuery(nextTrackId, { skip: !nextTrackId });
    const { data: prevTrack } = useGetOneTrackQuery(prevTrackId, { skip: !prevTrackId });

    const playerActions = new PlayerActions(
        active,
        album,
        volume,
        isPlaying,
        audio,
        currentTime,
        duration,
        isRepeat,
        isShuffle,
        currentTrackIndex,
        setNextTrackId,
        setPrevTrackId,
        setCurrentTrackIndex,
        dispatch,
    );

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
        }
    }, []);

    useEffect(() => {
        if (active) {
            playerActions.activeWatcher();
            playerActions.setCurrentTrackIndexHandler();
        }
    }, [active, album]);

    useEffect(() => {
        playerActions.setNextTrackIdHandler();
        playerActions.setPrevTrackIdHandler();
    }, [currentTrackIndex, isShuffle]);

    useEffect(() => {
        playerActions.formatSecondsToPercent();
        playerActions.endOfTrackActions();
    }, [currentTime]);

    useEffect(() => {
        playerActions.setVolumeOnAudioEl();
    }, [volume]);

    return (
        <footer className={styles.player}>
            <div className={styles.player__playing}>
                {active && (
                    <>
                        <img
                            className={styles.player__cover}
                            src={`https://danijel.pro/musify/api/${active.picture}`}
                            alt={`${active.artist} ${active.name} cover`}
                        />
                        <div className={styles.player__text}>
                            <div className={styles.player__track}>{active.name}</div>
                            <div className={styles.player__artist}>{active.artist}</div>
                        </div>
                    </>
                )}
            </div>
            <div className={styles.player__controls}>
                <div className={styles.player__buttons}>
                    <div className={styles.player__left}>
                        <IconBtn
                            icon="shuffle"
                            width={16}
                            height={16}
                            onClick={() => dispatch(setIsShuffle())}
                            active={isShuffle}
                        />
                        <IconBtn
                            icon="prev"
                            width={16}
                            height={16}
                            onClick={() => playerActions.changeActive(prevTrack)}
                        />
                    </div>
                    <div
                        className={styles.player__buttons_play}
                        onClick={() => playerActions.playToggle()}
                    >
                        <IconBtn icon={isPlaying ? 'pause' : 'play'} width={16} height={16} />
                    </div>
                    <div className={styles.player__right}>
                        <IconBtn
                            icon="next"
                            width={16}
                            height={16}
                            onClick={() => playerActions.changeActive(nextTrack)}
                        />
                        <IconBtn
                            icon="repeat"
                            width={16}
                            height={16}
                            onClick={() => dispatch(setIsRepeat())}
                            active={isRepeat}
                        />
                    </div>
                </div>
                <div className={styles.playback__bar}>
                    <div
                        className={[styles.playback__time, styles.playback__time_current].join(' ')}
                    >
                        {active ? formatTime(currentTime) : '--/--'}
                    </div>
                    <Range
                        step={0.1}
                        min={0}
                        max={100}
                        values={[playbackBarValue]}
                        onChange={(value) => playerActions.setTimeHandler(value)}
                        renderTrack={({ props, children }) => (
                            <div className={styles.renderTrack} {...props} style={props.style}>
                                <div
                                    className={styles.renderTrack__progress}
                                    style={{
                                        width: `${
                                            (props.ref.current?.offsetWidth * +currentTime) /
                                            duration
                                        }px`,
                                    }}
                                ></div>
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                className={styles.renderThumb}
                                {...props}
                                style={props.style}
                            ></div>
                        )}
                    />
                    <div className={styles.playback__time}>
                        {active ? formatTime(duration) : '--/--'}
                    </div>
                </div>
            </div>
            <div className={styles.player__sound}>
                <IconBtn
                    icon={volume === 0 ? 'soundOff' : 'sound'}
                    width={16}
                    height={16}
                    onClick={() => playerActions.soundToggle()}
                />
                <Range
                    step={1}
                    min={0}
                    max={100}
                    values={[volume]}
                    onChange={(playback) => dispatch(setVolume(playback[0]))}
                    renderTrack={({ props, children }) => (
                        <div
                            className={[styles.renderTrack, styles.renderTrack_sound].join(' ')}
                            {...props}
                            style={props.style}
                        >
                            <div
                                className={styles.renderTrack__progress}
                                style={{ width: `${(93 * volume) / 100}px` }}
                            ></div>
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div className={styles.renderThumb} {...props} style={props.style}></div>
                    )}
                />
            </div>
        </footer>
    );
};

export default Player;
