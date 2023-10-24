import React, { FC } from 'react';
import IconBtn from '../UI/IconBtn/IconBtn';
import styles from './TrackTableHead.module.css';

interface TrackTableHeadProps {
    withAlbum?: boolean;
}

const TrackTableHead: FC<TrackTableHeadProps> = ({ withAlbum }) => {
    return (
        <div
            className={
                withAlbum ? [styles.head__row, styles.head__row_album].join(' ') : styles.head__row
            }
        >
            <div className={styles.head__symbol}>#</div>
            <div className={styles.head__symbol}>Name</div>
            {withAlbum && <div className={styles.head__album}>Album</div>}
            <div className={styles.head__clock}>
                <IconBtn icon="clock" width={16} height={16} />
            </div>
        </div>
    );
};

export default TrackTableHead;
