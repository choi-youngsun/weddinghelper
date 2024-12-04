import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="fixed top-0 flex h-[60px] w-full items-center justify-between bg-[#ffffff9b] px-4">
      <Link href={'/'}>
        <Image
          width={150}
          height={32}
          src="/icons/logo_small.png"
          alt="내브바 작은 사이즈 로고"
        />
      </Link>
      <button className="hover:scale-105 active:brightness-95">
        //메뉴 기능 추가 예정
        <Image
          width={70}
          height={40}
          src="/icons/button_menu.png"
          alt="메뉴 버튼"
        />
      </button>
    </nav>
  );
}
