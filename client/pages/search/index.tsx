import TrackItem from '@/components/TrackItem/TrackItem';
import TrackTableHead from '@/components/TrackTableHead/TrackTableHead';
import MainLayout from '@/layouts/MainLayout';
import { useSearchTracksQuery } from '@/services/TrackService';
import { ITrack } from '@/types/track';
import React, { useEffect, useState } from 'react';
import styles from './SearchPage.module.css';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const { data: tracks, refetch } = useSearchTracksQuery(query, { skip: !query });

    useEffect(() => {
        if (query) {
            refetch();
        }
    }, [query]);

    return (
        <MainLayout>
            <div className={styles.search}>
                <input
                    type="text"
                    className={styles.search__input}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                <div className={styles.search__body}>
                    <div className={styles.search__container}>
                        {tracks?.length && query ? (
                            <>
                                <TrackTableHead withAlbum />
                                {tracks.map((track: ITrack, i: number) => (
                                    <TrackItem id={track._id} key={i} index={i} isSearch />
                                ))}
                            </>
                        ) : (
                            query && <div className={styles.search__empty}>{'No results :('}</div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default SearchPage;
