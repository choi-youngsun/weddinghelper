import NavBar from '@/components/@shared/NavBar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 경로별 클래스 설정
  const backgroundColor = () => {
    switch (router.pathname) {
      case '/admin/bride':
        return 'bg-background-pink';
      case '/guest/bride':
        return 'bg-background-pink';
      case '/admin/broom':
        return 'bg-background-blue';
      case '/guest/broom':
        return 'bg-background-blue';
      default:
        return 'bg-background-yellow';
    }
  };

  return (
    <main className={`${backgroundColor()} mx-auto min-h-screen w-full`}>
      <NavBar />
      <div>
        <Component {...pageProps} />
      </div>
    </main>
  );
}
