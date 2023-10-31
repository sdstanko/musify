import { useAppSelector } from '@/store/hooks';
import { IAlbum } from '@/types/album';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import IconBtn from '../UI/IconBtn/IconBtn';
import MenuItem from '../MenuItem/MenuItem';
import styles from './Menu.module.css';

const Menu = () => {
    const user = useAppSelector((store) => store.user.user);
    const isAuth = !!user._id;
    const { library } = user;

    return (
        <nav className={styles.menu}>
            <ul className={styles.menu__top}>
                <li className={styles.menu__btn}>
                    <Link href="/musify" className={styles.menu__link}>
                        <IconBtn icon="home" width={24} height={24} />
                        Main
                    </Link>
                </li>
                <li className={styles.menu__btn}>
                    <Link href="/musify/search" className={styles.menu__link}>
                        <IconBtn icon="search" width={24} height={24} />
                        Search
                    </Link>
                </li>
                <li className={styles.menu__btn}>
                    <Link href="/musify/upload" className={styles.menu__link}>
                        <IconBtn icon="create" width={24} height={24} />
                        Upload
                    </Link>
                </li>
            </ul>
            <div className={styles.menu__bot}>
                <div className={styles.menu__row}>
                    <div className={styles.menu__btn}>
                        <a className={styles.menu__link} href="http://">
                            <IconBtn icon="library" width={24} height={24} />
                            Library
                        </a>
                    </div>
                    <IconBtn icon="create" width={16} height={16} />
                </div>
                {isAuth ? (
                    <div className={styles.menu__items}>
                        {library.length === 0 ? (
                            <div className={styles.menu__empty}>Your library is empty</div>
                        ) : null}
                        {library.map((albumId, i) => (
                            <MenuItem id={albumId} key={i} />
                        ))}
                    </div>
                ) : (
                    <div>
                        <Link href="/auth/signin" className={styles.menu__signIn}>
                            Sign In
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Menu;
