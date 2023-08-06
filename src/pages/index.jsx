import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const userAgent = navigator.userAgent;

    // スマホの場合は/mobileにリダイレクト
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      router.push('/mobile');
    } else {
      // PCの場合は/PCにリダイレクト
      router.push('/PC');
    }
  }, []);

  return null;
};

export default Home;
