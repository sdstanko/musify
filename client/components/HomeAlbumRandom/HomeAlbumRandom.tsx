import { useGetOneTrackQuery } from '@/services/TrackService';
import { setActive } from '@/store/player/playerSlice';
import { IAlbum } from '@/types/album';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PlayBtn from '../UI/PlayBtn/PlayBtn';
import styles from './HomeAlbumRandom.module.css';

interface IHomeAlbumRandomProps {
    album: IAlbum
}

const HomeAlbumRandom: FC<IHomeAlbumRandomProps> = ({ album }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [fetchTrack, setfetchTrack] = useState(false);
    const { data: track } = useGetOneTrackQuery(album.tracks[0], { skip: !fetchTrack });

    const playAlbum = (e: React.MouseEvent) => {
        e.stopPropagation();
        setfetchTrack(true);
    };

    useEffect(() => {
        if (track) {
            dispatch(setActive({ ...track, picture: album.picture }));
        }
    }, [track]);

    return (
        <div className={styles.item} onClick={() => router.push(`/musify/album/${album._id}`)}>
            <div className={styles.item__cover}>
                <img
                    className={styles.item__img}
                    src={`https://danijel.pro/musify/api/${album.picture}`}
                    alt=""
                />
            </div>
            <div className={styles.item__row}>
                <a href="#" className={styles.item__text}>
                    {album.name}
                </a>
                <div className={styles.item__play}>
                    <PlayBtn size={48} onClick={(e) => playAlbum(e)} />
                </div>
            </div>
        </div>
    );
};

export default HomeAlbumRandom;
