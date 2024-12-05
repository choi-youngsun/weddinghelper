import Image from 'next/image';
import Link from 'next/link';
import { Dropdown, DropdownOption } from './Dropdown';
import { useDropdown } from '@/hooks/useDropdown';

export default function NavBar() {
  const { isOpen, onClose, onSwitch } = useDropdown();

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

  const handleOptionClick = (option: DropdownOption) => {
    console.log(option.value, '클릭!');
  };

  const navOptions = [
    { label: '로그아웃', value: 'logout' },
    { label: '메인 화면', value: 'main' },
    { label: '정보 수정', value: 'setting' },
  ];

  return (
    <nav className="fixed top-0 z-10 flex h-[60px] w-full items-center justify-between bg-[#ffffff9b] px-4">
      <Link href={'/'}>
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
        width={150}
      />
    </nav>
  );
}
