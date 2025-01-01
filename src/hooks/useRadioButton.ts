import { useState } from 'react';

export const useRadioButton = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
  };

  return {
    selectedOption,
    setSelectedOption,
    handleSelect,
  };
};
