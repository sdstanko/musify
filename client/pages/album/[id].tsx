import IconBtn from '@/components/UI/IconBtn/IconBtn';
import PlayBtn from '@/components/UI/PlayBtn/PlayBtn';
import TrackItem from '@/components/TrackItem/TrackItem';
import TrackTableHead from '@/components/TrackTableHead/TrackTableHead';
import MainLayout from '@/layouts/MainLayout';
import { useGetOneAlbumQuery } from '@/services/AlbumService';
import { useGetOneTrackQuery } from '@/services/TrackService';
import { useLibraryToggleMutation } from '@/services/UserService';
import { useAppSelector } from '@/store/hooks';
import { setActive } from '@/store/player/playerSlice';
import { setUser } from '@/store/user/userSlice';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './AlbumPage.module.css';

const AlbumPage: FC = () => {
    const dispatch = useDispatch();
    const user = useAppSelector((store) => store.user.user);
    const router = useRouter();
    const [isInLibrary, setIsInLibrary] = useState(false);

    const id = router.query.id;
    const { data: album, isSuccess } = useGetOneAlbumQuery(id, { skip: !id });
    const { data: track } = useGetOneTrackQuery(album?.tracks[0], {
        skip: !isSuccess,
    });
    const [libraryToggle] = useLibraryToggleMutation();

    console.log(router);

    useEffect(() => {
        if (!Array.isArray(id) && id) {
            setIsInLibrary(user.library.includes(id));
        }
    }, [user.library]);

    const play = () => {
        // e.stopPropagation();
        dispatch(setActive({ ...track, picture: album.picture }));
    };

    const libraryToggleHandler = async () => {
        const response = await libraryToggle({ userId: user._id, albumId: id }).unwrap();
        const { userName, email, _id, library } = response;
        dispatch(setUser({ userName, email, _id, library }));
    };

    return (
        <MainLayout>
            {isSuccess && (
                <main className={styles.album}>
                    <div className={styles.album__top}>
                        <div className={styles.album__cover}>
                            <img
                                className={styles.album__img}
                                src={`https://danijel.pro/musify/api/${album.picture}`}
                                alt=""
                            />
                        </div>
                        <div className={styles.album__text}>
                            <h1 className={styles.album__name}>{album.name}</h1>
                            <div className={styles.album__artist}>{album.artist}</div>
                        </div>
                    </div>
                    <div className={styles.album__mid}>
                        <PlayBtn size={56} onClick={play} />
                        {user._id && (
                            <IconBtn
                                icon="like"
                                width={32}
                                height={32}
                                onClick={libraryToggleHandler}
                                active={isInLibrary}
                            />
                        )}
                    </div>
                    <div className={styles.album__bot}>
                        <TrackTableHead />
                        <div className={styles.album__tracks}>
                            {album.tracks.map((trackId: string, i: number) => (
                                <TrackItem id={trackId} key={i} index={i} />
                            ))}
                        </div>
                    </div>
                </main>
            )}
        </MainLayout>
    );
};

export default AlbumPage;
