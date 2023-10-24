import { useGetOneAlbumQuery } from '@/services/AlbumService';
import { useGetOneTrackQuery } from '@/services/TrackService';
import { setActive } from '@/store/player/playerSlice';
import { formatTime } from '@/utils/formatTime';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './TrackItem.module.css';

interface ITrackItemProps {
    id: string;
    index: number;
    picture?: string;
    isSearch?: boolean;
}

let audio: any;

const TrackItem: FC<ITrackItemProps> = ({ id, index, isSearch }) => {
    const [length, setLength] = useState('');
    const dispatch = useDispatch();

    const { data: track, isSuccess: isSuccessTrack } = useGetOneTrackQuery(id);
    const { data: album, isSuccess: isSuccessAlbum } = useGetOneAlbumQuery(track?.album, {
        skip: !track,
    });

    useEffect(() => {
        if (isSuccessTrack) {
            let audio = new Audio();
            audio.src = 'https://danijel.pro/musify/api/' + track?.audio;
            audio.onloadedmetadata = () => {
                let duration = Math.ceil(audio.duration);
                const formattedTime = formatTime(duration);
                setLength(formattedTime);
            };
        }
    }, [isSuccessTrack]);

    const play = () => {
        dispatch(setActive({ ...track, picture: album.picture }));
    };

    return (
        <>
            {isSuccessTrack && isSuccessAlbum && (
                <div
                    className={isSearch ? [styles.item, styles.item_album].join(' ') : styles.item}
                    onClick={play}
                >
                    <div className={styles.item__index}>{index + 1}</div>
                    <div className={styles.item__track}>
                        {isSearch && (
                            <img
                                className={styles.item__cover}
                                src={`https://danijel.pro/musify/api/${album.picture}`}
                                alt=""
                            />
                        )}
                        <div className={styles.item__text}>
                            <div className={styles.item__name}>{track.name}</div>
                            <div className={styles.item__artist}>{track.artist}</div>
                        </div>
                    </div>
                    {isSearch && (
                        <Link
                            href={`https://danijel.pro/musify/api/${album._id}`}
                            className={styles.item__album}
                        >
                            {album.name}
                        </Link>
                    )}
                    <div className={styles.item__length}>{length}</div>
                </div>
            )}
        </>
    );
};

export default TrackItem;
