import { IAlbum } from '@/types/album';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import PlayBtn from '../UI/PlayBtn/PlayBtn';
import styles from './HomeAlbumRandom.module.css';

interface IHomeAlbumRandomProps {
    album: IAlbum
}

const HomeAlbumRandom: FC<IHomeAlbumRandomProps> = ({ album }) => {
    const router = useRouter();

    return (
        <div className={styles.item} 
        // onClick={() => router.push(`/musify/album/${album._id}`)}
        >
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
                    <PlayBtn size={48} />
                </div>
            </div>
        </div>
    );
};

export default HomeAlbumRandom;
