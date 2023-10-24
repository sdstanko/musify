import React, { FC, useEffect, useState } from 'react';
import { useCheckQuery } from '@/services/AuthService';
import styles from './Wrapper.module.css';
import { useAppDispatch } from '@/store/hooks';
import jwtDecode from 'jwt-decode';
import { setUser } from '@/store/user/userSlice';
import { IUser } from '@/types/user';
import axios from 'axios';
import { useGetUserByIdQuery } from '@/services/UserService';

interface IWrapperProps {
    fontClass: string;
    children: React.ReactNode;
}

const Wrapper: FC<IWrapperProps> = ({ fontClass, children }) => {
    const [id, setId] = useState('');
    const { data: response } = useCheckQuery('');
    const { data: userData } = useGetUserByIdQuery(id, {skip: !id});
    const token = response?.token;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token) {
            const { _id } = jwtDecode<IUser>(token);
            setId(_id);
            localStorage.setItem('token', token);
        }
    }, [token]);

	useEffect(() => {
		if (userData) {
            const {userName, email, _id, library} = userData
			dispatch(setUser({ userName, email, _id, library }));
		}
	}, [userData])

    return <div className={[fontClass, styles.wrapper].join(' ')}>{children}</div>;
};

export default Wrapper;
