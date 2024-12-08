import { DropdownOption } from '@/components/@shared/Dropdown';
import { useState } from 'react';

export const useSelectBox = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    null
  );

  const handleSelect = (value: DropdownOption) => {
    setSelectedOption(value);
  };

  return {
    selectedOption,
    setSelectedOption,
    handleSelect,
  };
};
