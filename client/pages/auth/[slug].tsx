import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import styles from './Auth.module.css';
import { useCreateUserMutation } from '@/services/UserService';
import { useLoginMutation } from '@/services/AuthService';
import { setUser } from '@/store/user/userSlice';
import AuthSchemaConstructor from '../../formSchemas/AuthSchemaConstructor';
import { ITokenData } from '@/types/tokenData';
import { IUser } from '@/types/user';

export interface AuthValues {
    userName: string;
    email: string;
    password: string;
    isSignIn?: boolean;
}

const Auth: FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const action = router.query.slug;
    const [isSignInValue, setIsSignInValue] = useState(false);

    const [createUser] = useCreateUserMutation();
    const [login] = useLoginMutation();

    useEffect(() => {
    }, [])
    console.log(router)

    useEffect(() => {
        if (action === 'signin') {
            setIsSignInValue(true);
        } else {
            setIsSignInValue(false);
        }
    }, [action]);

    let initialValues: AuthValues = { userName: '', email: '', password: '', isSignIn: false };
    let SignupSchema = AuthSchemaConstructor(isSignInValue);

    const formSubmit = async (user: AuthValues) => {
        try {
            if (!isSignInValue) {
                await createUser(user).unwrap();
            }
            const { token } = await login({
                userName: user.userName,
                password: user.password,
            }).unwrap();

            localStorage.setItem('token', token);
            const { _id } = jwtDecode<ITokenData>(token);
            const { data: userData } = await axios.get<IUser>(
                `https://danijel.pro/musify/api/user/${_id}`,
            );
            dispatch(setUser(userData));
            
            router.push('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className={styles.auth}>
            <div className={styles.auth__inner}>
                <h1 className={styles.auth__title}>{isSignInValue ? 'Sign In' : 'Sign Up'}</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    onSubmit={(values, actions) => {
                        formSubmit(values);
                        actions.setSubmitting(false);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={styles.auth__form}>
                            <div className={styles.auth__row}>
                                <label className={styles.auth__label} htmlFor="userName">
                                    User Name
                                </label>
                                <Field
                                    className={styles.auth__field}
                                    id="userName"
                                    name="userName"
                                    placeholder="User Name"
                                />
                                {errors.userName && touched.userName ? (
                                    <div className={styles.auth__error}>{errors.userName}</div>
                                ) : null}
                            </div>
                            {!isSignInValue && (
                                <div className={styles.auth__row}>
                                    <label className={styles.auth__label} htmlFor="email">
                                        email
                                    </label>
                                    <Field
                                        className={styles.auth__field}
                                        id="email"
                                        name="email"
                                        placeholder="email"
                                    />
                                    {errors.email && touched.email ? (
                                        <div className={styles.auth__error}>{errors.email}</div>
                                    ) : null}
                                </div>
                            )}

                            <div className={styles.auth__row}>
                                <label className={styles.auth__label} htmlFor="password">
                                    password
                                </label>
                                <Field
                                    className={styles.auth__field}
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    type="password"
                                />
                                {errors.password && touched.password ? (
                                    <div className={styles.auth__error}>{errors.password}</div>
                                ) : null}
                            </div>
                            <button className={styles.auth__btn} type="submit">
                                Sign Up
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className={styles.auth__option}>
                    {isSignInValue ? (
                        <div className={styles.auth__bottom}>
                            <span className={styles.auth__text}>Don't have an account?</span>
                            <Link className={styles.auth__link} href="/auth/signup">
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.auth__bottom}>
                            <span className={styles.auth__text}>Already have an account?</span>
                            <Link className={styles.auth__link} href="/auth/signin">
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Auth;
