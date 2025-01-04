import Button from '@/components/@shared/Button';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 기본 Link 클릭 동작을 막음

    const user = localStorage.getItem('user');

    if (user) {
      // user가 있으면 /home으로 리디렉션
      router.push('/home');
    } else {
      // user가 없으면 /login으로 리디렉션
      router.push('/login');
    }
  };

  return (
    <div className="mx-auto flex w-[200px] flex-col items-center justify-center gap-[20px]">
      <a href="/home" onClick={handleLinkClick} className="mt-[300px] w-full ">
        <Button buttonColor="white" borderColor="shadow">
          시작하기
        </Button>
      </a>
    </div>
  );
}
