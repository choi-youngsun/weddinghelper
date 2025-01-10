import NavBar from '@/components/@shared/NavBar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useMemo } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useMemo(() => new QueryClient(), []);
  const router = useRouter();

  useEffect(() => {
    // window가 정의된 경우에만 실행
    if (typeof window !== 'undefined') {
      const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
      });

      persistQueryClient({
        queryClient,
        persister: localStoragePersister,
      });
    }
  }, [queryClient]);

  // 경로별 클래스 설정
  const backgroundColor = () => {
    switch (router.pathname) {
      case '/admin/bride':
        return 'bg-background-pink';
      case '/guest/bride':
        return 'bg-background-pink';
      case '/admin/groom':
        return 'bg-background-blue';
      case '/guest/groom':
        return 'bg-background-blue';
      default:
        return 'bg-background-yellow';
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>웨딩헬퍼</title>
        <meta
          name="description"
          content="결혼식 방명록 정리를 쉽고 빠르게. 웨딩헬퍼와 함께해보세요"
        />
        <meta name="keywords" content="서비스, 웹사이트, Next.js, 오픈그래프" />
        <meta name="author" content="최영선 choi-youngsun" />

        {/* Open Graph 메타태그 */}
        <meta property="og:title" content="웨딩헬퍼" />
        <meta
          property="og:description"
          content="결혼식 방명록 정리를 쉽고 빠르게. 웨딩헬퍼와 함께해보세요"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weddinghelper.vercel.app/" />
        <meta
          property="og:image"
          content="https://weddinghelper.vercel.app/images/thumbnail_new.png"
        />
        <meta property="og:site_name" content="웨딩헬퍼" />
        <meta property="og:locale" content="ko_KR" />

        {/* Twitter 카드 메타태그 */}
        <meta
          name="twitter:card"
          content="https://weddinghelper.vercel.app/images/thumbnail_new.png"
        />
        <meta name="twitter:title" content="웨딩헬퍼" />
        <meta
          name="twitter:description"
          content="결혼식 방명록 정리를 쉽고 빠르게. 웨딩헬퍼와 함께해보세요"
        />
        <meta
          name="twitter:image"
          content="https://weddinghelper.vercel.app/images/thumbnail_new.png"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${backgroundColor()} mx-auto min-h-screen w-full`}>
        <QueryClientProvider client={queryClient}>
          {' '}
          <NavBar />
          <div>
            <Component {...pageProps} />
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </div>
        </QueryClientProvider>
      </main>
    </>
  );
}
