import GuestForm from '@/components/guest/GuestForm';
import { useModal } from '@/hooks/useModal';
import { useRadioButton } from '@/hooks/useRadioButton';
import { useSelectBox } from '@/hooks/useSelectBox';
import { useState } from 'react';

export default function GuestBroomPage() {
  const {
    selectedOption: selectedTicketOption,
    setSelectedOption: setSelectedTicketOption,
    handleSelect: handleTicketSelect,
  } = useRadioButton();
  const {
    selectedOption: selectedGroupOption,
    setSelectedOption: setSelectedGroupOption,
    handleSelect: handleGroupSelect,
  } = useSelectBox();
  const { isOpen, onClose, onOpen } = useModal();

  const handleOpenModal = () => {
    onOpen();

    // 3초 뒤에 모달 닫기
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const broomGroupOptions = [
    { label: '가족', value: '가족' },
    { label: '대학교', value: '대학교' },
    { label: '교회', value: '교회' },
    { label: '중/고등학교', value: '중/고등학교' },
    { label: '커스트', value: '커스트' },
    { label: '직장', value: '직장' },
    { label: '기타', value: '기타' },
  ];

  const [nameValue, setNameValue] = useState('');

  // 입력값 변경 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNameValue(value);
  };

  const handleSubmit = () => {
    console.log({
      구분: '신랑측',
      이름: nameValue,
      소속: selectedGroupOption,
      식권: selectedTicketOption,
    });
    setNameValue('');
    setSelectedGroupOption(null);
    setSelectedTicketOption(null);
    handleOpenModal();
  };

  return (
    <GuestForm
      side="broom"
      nameValue={nameValue}
      onNameChange={handleNameChange}
      groupOptions={broomGroupOptions}
      selectedGroupOption={selectedGroupOption}
      selectedTicketOption={selectedTicketOption}
      handleGroupSelect={handleGroupSelect}
      handleTicketSelect={handleTicketSelect}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
