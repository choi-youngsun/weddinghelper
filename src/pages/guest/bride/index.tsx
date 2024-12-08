import Button from '@/components/@shared/Button';
import { DropdownOption } from '@/components/@shared/Dropdown';
import Input from '@/components/@shared/Input';
import RadioButton from '@/components/@shared/RadioButton';
import SelectBox from '@/components/@shared/SelectBox';
import { useRadioButton } from '@/hooks/useRadioButton';
import { useSelectBox } from '@/hooks/useSelectBox';
import { useState } from 'react';

export default function GuestBridePage() {
  const { selectedOption, setSelectedOption, handleSelect } = useRadioButton();
  const {
    selectedOption: selectedGroupOption,
    setSelectedOption: setSelectedGroupOption,
    handleSelect: handleGroupSelect,
  } = useSelectBox();

  const groupOptions = [
    { label: '대학교', value: '대학교' },
    { label: '가족', value: '가족' },
    { label: '교회', value: '교회' },
    { label: '중/고등학교', value: '중/고등학교' },
    { label: '동호회', value: '동호회' },
    { label: '직장', value: '직장' },
    { label: '기타', value: '기타' },
  ];

  const radioOption = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '그이상', value: '' },
  ];

  const [nameValue, setNameValue] = useState('');

  // 입력값 변경 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNameValue(value);
  };

  const handleSubmit = () => {
    console.log({
      이름: nameValue,
      소속: selectedGroupOption,
      식권: selectedOption,
    });
    setNameValue('');
    setSelectedGroupOption(null);
    setSelectedOption(null);
  };

  const isAllInputFilled = () => {
    return (
      nameValue !== '' &&
      selectedGroupOption !== null &&
      selectedOption !== null
    );
  };

  return (
    <div className="mx-auto mb-[50px] md:w-[500px]">
      <form className="flex w-full flex-col gap-[30px] px-[30px]">
        <p className="mt-[150px] text-center text-xl-regular">신부측</p>
        <div>
          <p className="mb-[20px] text-md-regular">이름</p>
          <Input
            placeholder="이름을 입력하세요."
            name="name"
            value={nameValue}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <p className="mb-[20px] text-md-regular">소속</p>
          <SelectBox
            options={groupOptions}
            className="text-md-regular"
            selectedOption={selectedGroupOption}
            handleSelect={handleGroupSelect}
          />
        </div>
        <div>
          <p className="mb-[20px] text-md-regular">식권</p>
          <RadioButton
            options={radioOption}
            selectedOption={selectedOption}
            handleSelect={handleSelect}
            className="grid grid-cols-2 gap-10 text-xl"
          />
        </div>
        <Button
          onClick={handleSubmit}
          buttonColor="pink"
          textSize="20"
          buttonHeight={60}
          disabled={!isAllInputFilled()}
        >
          제출
        </Button>
      </form>
    </div>
  );
}
