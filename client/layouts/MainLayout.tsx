import Menu from '@/components/Menu/Menu';
import Player from '@/components/Player/Player';
import React, { FC } from 'react';
import styles from './MainLayout.module.css'

const MainLayout: FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Menu></Menu>
            {children}
            <Player></Player>
        </div>
    );
};

export default MainLayout;
