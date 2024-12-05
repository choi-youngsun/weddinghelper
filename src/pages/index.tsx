import Button from '@/components/@shared/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="mx-auto mt-[300px] flex w-[200px] flex-col items-center justify-center gap-[20px]">
        <Link href={'/admin'} className="w-full">
          <Button buttonColor="white" borderColor="shadow">
            관리자
          </Button>
        </Link>
        <Link href={'/guest/bride'} className="w-full">
          <Button buttonColor="white" borderColor="shadow">
            신부측 하객
          </Button>
        </Link>
        <Link href={'/guest/broom'} className="w-full">
          <Button buttonColor="white" borderColor="shadow">
            신랑측 하객
          </Button>
        </Link>
      </div>
    </main>
  );
}
