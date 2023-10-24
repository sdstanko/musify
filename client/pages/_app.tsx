import { FC } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';

import './styles.css';
import localFont from 'next/font/local';
import Wrapper from '@/layouts/Wrapper';

const circularSp = localFont({ src: './fonts/CircularSp.woff2' });

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    const { store } = wrapper.useWrappedStore(pageProps);

    return (
        <Provider store={store}>
            <Wrapper fontClass={circularSp.className}>
                <Component {...pageProps}></Component>
            </Wrapper>
        </Provider>
    );
};

export default MyApp;
