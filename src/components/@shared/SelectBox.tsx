import { useState } from 'react';
import { Dropdown, DropdownOption } from './Dropdown';
import { useDropdown } from '@/hooks/useDropdown';
import Image from 'next/image';

type SelectBoxProps = {
  options: DropdownOption[];
  width?: number;
};

/**
 * SelectBox 컴포넌트
 *
 * 드롭다운 형태로 선택 가능한 옵션을 표시하며, 선택된 옵션을 표시합니다.
 *
 * @param {SelectBoxProps} props - SelectBox 컴포넌트의 속성
 * @param {DropdownOption[]} props.options - 선택 가능한 옵션 배열
 * @param {number} [props.width] - SelectBox의 너비 (기본값: 100%)
 *
 * @returns {JSX.Element} SelectBox 컴포넌트 JSX 요소
 */
export default function SelectBox({ options, width }: SelectBoxProps) {
  const [selectedOption, setSelectedOption] = useState('소속 선택');
  const { isOpen, onClose, onSwitch } = useDropdown();

  const SelectBoxTrigger = (
    <div
      className="border-border-gray flex h-[40px] cursor-pointer items-center justify-between rounded-[16px] border bg-white px-3 py-[5px]"
      style={{ width: `${width || 100}%` }}
    >
      <p>{selectedOption}</p>
      <div className="w-[18px]">
        <Image
          src={isOpen ? '/icons/triangle_up.png' : '/icons/triangle_down.png'}
          alt="삼각형 아이콘"
          width={30}
          height={10}
        />
      </div>
    </div>
  );

  const handleSelectClick = (option: DropdownOption) => {
    setSelectedOption(option.label);
  };

  return (
    <Dropdown
      onOptionClick={handleSelectClick}
      options={options}
      triggerIcon={SelectBoxTrigger}
      width={width}
      isOpen={isOpen}
      onClose={onClose}
      onSwitch={onSwitch}
    />
  );
}
