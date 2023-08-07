import '@/styles/globals.css'
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const redirectRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const asPath = router.asPath
  console.log(asPath)
  const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : null;
  const AgentPath = ['/mobile','/PC']

  useEffect(() => {
    if (userAgent) {
      // ユーザーエージェントに応じてリダイレクト先を決定
      const isMobile = redirectRegex.test(userAgent);
      if (asPath.startsWith(AgentPath[0])) {
        if (!isMobile) {
          router.push(asPath.replace(/^\/mobile/, '/PC'));
        }
      } else if (asPath.startsWith(AgentPath[1])) {
        if (isMobile) {
          router.push(asPath.replace(/^\/PC/, '/mobile'));
        }
      } else {
        if (isMobile) {
          router.push(AgentPath[0] + asPath)
        } else {
          router.push(AgentPath[1] + asPath)
        }
      }

      if (asPath.startsWith('/mobile') && !isMobile) {
        // /mobileから/mobileを削除して/PCを追加
        router.push(asPath.replace(/^\/mobile/, '/PC'));
      } else if (asPath.startsWith('/PC') && isMobile) {
        // /PCから/PCを削除して/mobileを追加
        router.push(asPath.replace(/^\/PC/, '/mobile'));
      }
    }
  }, [userAgent, asPath]);

  return (
    <>
      <Head>
        <title>キャンフェス大宮2023</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
