import { useGetOneAlbumQuery } from '@/services/AlbumService';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styles from './MenuItem.module.css';

interface IMenuItemProps {
    id: string;
}

const MenuItem: FC<IMenuItemProps> = ({ id }) => {
    const router = useRouter()
    const { data: album, isSuccess } = useGetOneAlbumQuery(id);

    return (
        <>
            {isSuccess && (
                <div className={styles.item} onClick={() => router.push(`/album/${id}`)}>
                    <img
                        className={styles.picture}
                        src={`https://danijel.pro/musify/api/${album.picture}`}
                        alt=""
                    />
                    <div className={styles.row}>
                        <div className={styles.name}>{album.name}</div>
                        <div className={styles.artist}>{album.artist}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MenuItem;
