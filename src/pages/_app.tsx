import NavBar from '@/components/@shared/NavBar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="mx-auto w-full xl:w-[1280px]">
      <NavBar />
      <div className="mt-[60px]">
        <Component {...pageProps} />
      </div>
    </main>
  );
}
