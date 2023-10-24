import React, { FC } from 'react';
import styles from './PlayBtn.module.css';
const url = '/musify/icons.svg';

interface PlayBtnProps {
	size: number;
    onClick?: () => void;
}

const PlayBtn: FC<PlayBtnProps> = ({ size, onClick }) => {
    return (
        <button onClick={onClick} className={styles.button} style={{ width: size, height: size }}>
            <svg className={styles.icon}>
                <use href={`${url}#play`}></use>
            </svg>
        </button>
    );
};

export default PlayBtn;
