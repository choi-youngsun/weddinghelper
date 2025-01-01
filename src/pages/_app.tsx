import NavBar from '@/components/@shared/NavBar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
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
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/og-image.png"
        />
        <meta property="og:site_name" content="웨딩헬퍼" />
        <meta property="og:locale" content="ko_KR" />

        {/* Twitter 카드 메타태그 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="웨딩헬퍼" />
        <meta
          name="twitter:description"
          content="결혼식 방명록 정리를 쉽고 빠르게. 웨딩헬퍼와 함께해보세요"
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/twitter-image.png"
        />
        <meta name="twitter:site" content="@YourTwitterHandle" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <main className={`${backgroundColor()} mx-auto min-h-screen w-full`}>
        <NavBar />
        <div>
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}
