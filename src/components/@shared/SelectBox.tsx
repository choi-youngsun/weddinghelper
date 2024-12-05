import { useState } from 'react';
import { Dropdown, DropdownOption } from './Dropdown';
import { useDropdown } from '@/hooks/useDropdown';
import Image from 'next/image';

type SelectBoxProps = {
  options: DropdownOption[];
  width?: number;
};

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
