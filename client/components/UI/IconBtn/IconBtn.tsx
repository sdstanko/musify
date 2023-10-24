import React, { FC } from 'react';
import styles from './IconBtn.module.css';
const url = '/icons.svg';

interface IconBtnProps {
    icon: string;
    width: number;
    height: number;
    onClick?: (e: any) => void;
    active?: boolean;
    modifier?: string
}

const IconBtn: FC<IconBtnProps> = ({ icon, width, height, active, onClick, modifier }) => {
    return (
        <button onClick={onClick} className={[styles.button, modifier].join(' ')}>
            <svg className={styles.icon} width={width} height={height}>
                <use href={`${url}#${icon}`} fill={active ? '#fff' : ''}></use>
            </svg>
        </button>
    );
};

export default IconBtn;
