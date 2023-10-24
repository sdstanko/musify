import { IAlbum } from '@/types/album';
import { useRouter } from 'next/dist/client/router';
import React, { FC, useEffect, useState } from 'react';
import { useGetAllAlbumsQuery } from '../../services/AlbumService';
import HomeAlbumNew from '../HomeAlbumNew/HomeAlbumNew';
import HomeAlbumRandom from '../HomeAlbumRandom/HomeAlbumRandom';
import styles from './Home.module.css';
import randomNums from '@/utils/randomNums';
import { useAppSelector } from '@/store/hooks';

const Home: FC = () => {
    const [randomIndexes, setRandomIndexes] = useState<number[]>([]);
    const { data: albums, isSuccess, isLoading } = useGetAllAlbumsQuery('');
    const router = useRouter();

    useEffect(() => {
        if (isSuccess) {
            if (albums.length >= 6) {
                setRandomIndexes(randomNums(6, albums.length));
            } else {
                setRandomIndexes(randomNums(albums.length, albums.length));
            }
        }
    }, [albums]);

    const userName = useAppSelector((store) => store.user.user.userName);

    return (
        <main className={styles.home}>
            <div className={styles.home__inner}>
                <h1 className={styles.home__title}>Hello{userName ? `, ${userName}` : ''}</h1>
                <div className={styles.home__random}>
                    {isSuccess &&
                        albums.map((item: IAlbum, i: number) =>
                            randomIndexes.includes(i) ? (
                                <HomeAlbumRandom album={item} key={i} />
                            ) : null,
                        )}
                </div>
                <div className={styles.home__new}>
                    <h2 className={styles.home__subtitle}>New music</h2>
                    <div className={styles.home__grid}>
                        {isSuccess &&
                            albums.map((album: IAlbum, i: number) => (
                                <HomeAlbumNew album={album} key={i} />
                            ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
