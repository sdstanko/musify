import React from 'react';
import styles from './Spinner.module.css';

const Spinner = () => {
    return (
        <>
        <div className={styles.bg}>
            <div className={styles.ldsDualRing}>
                <div className={styles.ldsDualRingAfter}></div>
            </div>
        </div>
        </>
    );
};

export default Spinner;
