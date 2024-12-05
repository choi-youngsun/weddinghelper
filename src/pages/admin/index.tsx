import Button from '@/components/@shared/Button';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <main>
      <div className="mx-auto mt-[300px] flex w-[200px] flex-col items-center justify-center gap-[20px]">
        <Link href={'/admin/setting'} className="w-full">
          <Button buttonColor="white" borderColor="shadow">
            정보 수정
          </Button>
        </Link>
        <Link href={'/admin/bride'} className="w-full">
          <Button buttonColor="white" borderColor="shadow">
            신부측 방명록 관리
          </Button>
        </Link>
        <Link href={'/admin/broom'} className="w-full">
          <Button buttonColor="white" borderColor="shadow">
            신랑측 방명록 관리
          </Button>
        </Link>
      </div>
    </main>
  );
}
