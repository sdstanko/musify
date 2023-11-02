import { IAlbum } from '@/types/album';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import PlayBtn from '../UI/PlayBtn/PlayBtn';
import styles from './HomeAlbumNew.module.css';

interface IHomeAlbumProps {
    album: IAlbum
}

const HomeAlbumNew: FC<IHomeAlbumProps> = ({ album }) => {
    const router = useRouter()

    return (
        <div
            className={styles.item}
            onClick={() => router.push(`/musify/album/${album._id}`)}
        >
            <div className={styles.item__top}>
                <div className={styles.item__cover}>
                    <img
                        className={styles.item__img}
                        src={`https://danijel.pro/musify/api/${album.picture}`}
                        alt=""
                    />
                </div>
                <div className={styles.item__btn}>
                    <PlayBtn size={48} />
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
