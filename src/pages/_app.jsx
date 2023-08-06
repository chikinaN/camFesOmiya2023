import '@/styles/globals.css'

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import App from 'next/app';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const userAgent = navigator.userAgent || '';
    const redirectRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    if (redirectRegex.test(userAgent)) {
      // スマホの場合は/mobileにリダイレクト
      if (!window.location.pathname.startsWith('/mobile')) {
        router.push('/mobile');
      }
    } else {
      // PCの場合は/PCにリダイレクト
      if (!window.location.pathname.startsWith('/PC')) {
        router.push('/PC');
      }
    }
  }, []);

  return <Component {...pageProps} />;
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
