import Image from 'next/image';
import Link from 'next/link';
import { Dropdown, DropdownOption } from './Dropdown';
import { useDropdown } from '@/hooks/useDropdown';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { postLogOut } from '@/api/auth/authAPI';

export default function NavBar() {
  const { isOpen, onClose, onSwitch } = useDropdown();
  const router = useRouter();

  const MenuButton = (
    <button className="hover:scale-105 active:brightness-95">
      <Image
        width={70}
        height={40}
        src="/icons/button_menu.png"
        alt="메뉴 버튼"
      />
    </button>
  );

  const { mutate: logout } = useMutation({
    mutationFn: () => postLogOut(),
    onSuccess: () => {
      console.log('로그아웃 성공!');
      router.push('/login');
      localStorage.removeItem('user');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
    },
  });

  const handleOptionClick = (option: DropdownOption) => {
    if (option.value === 'logout') {
      logout();
    } else if (option.value === 'admin') {
      router.push('/admin');
    } else {
      router.push('/admin/setting');
    }
  };

  const navOptions = [
    { label: '로그아웃', value: 'logout' },
    { label: '관리자 페이지', value: 'admin' },
    { label: '정보 수정', value: 'setting' },
  ];

  return (
    <nav className="fixed left-0 top-0 z-10 w-full bg-[#ffffff9b] px-4">
      <div className="mx-auto my-auto flex h-[60px] items-center justify-between xl:w-[1280px]">
        <Link href={'/home'}>
          <Image
            width={150}
            height={32}
            src="/icons/logo_small.png"
            alt="내브바 작은 사이즈 로고"
          />
        </Link>
        <Dropdown
          triggerIcon={MenuButton}
          options={navOptions}
          onOptionClick={handleOptionClick}
          isOpen={isOpen}
          onClose={onClose}
          onSwitch={onSwitch}
          width={200}
          className="text-center"
        />
      </div>
    </nav>
  );
}
