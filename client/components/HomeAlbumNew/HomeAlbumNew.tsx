import { useGetOneAlbumQuery } from '@/services/AlbumService';
import { useGetOneTrackQuery } from '@/services/TrackService';
import { setActive } from '@/store/player/playerSlice';
import { IAlbum } from '@/types/album';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PlayBtn from '../UI/PlayBtn/PlayBtn';
import styles from './HomeAlbumNew.module.css';

interface IHomeAlbumProps {
    album: IAlbum;
}

const HomeAlbumNew: FC<IHomeAlbumProps> = ({ album }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const [fetchTrack, setfetchTrack] = useState(false);
    const { data: track } = useGetOneTrackQuery(album.tracks[0], { skip: !fetchTrack });

    const playAlbum = (e: React.MouseEvent) => {
        e.stopPropagation()
        setfetchTrack(true);
    };

    useEffect(() => {
        if (track) {
            dispatch(setActive({ ...track, picture: album.picture }));
        }
    }, [track]);

    return (
        <div className={styles.item} onClick={() => router.push(`/musify/album/${album._id}`)}>
            <div className={styles.item__top}>
                <div className={styles.item__cover}>
                    <img
                        className={styles.item__img}
                        src={`https://danijel.pro/musify/api/${album.picture}`}
                        alt=""
                    />
                </div>
                <div className={styles.item__btn}>
                    <PlayBtn size={48} onClick={(e) => playAlbum(e)} />
                </div>
            </div>
            <div className={styles.item__text}>
                <div className={styles.item__name}>{album.name}</div>
                <div className={styles.item__artist}>{album.artist}</div>
            </div>
        </div>
    );
};

export default HomeAlbumNew;
