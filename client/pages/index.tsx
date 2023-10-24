import React, { FC } from 'react';
import styles from './index.module.css';
import MainLayout from '@/layouts/MainLayout';
import Home from '../components/Home/Home'


const index: FC = () => {
    return (
        <div className={styles.wrapper}>
            <MainLayout>
                <Home></Home>
            </MainLayout>
        </div>
    );
};

export default index;
