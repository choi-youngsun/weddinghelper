import GuestForm from '@/components/guest/GuestForm';
import { useModal } from '@/hooks/useModal';
import { useRadioButton } from '@/hooks/useRadioButton';
import { useSelectBox } from '@/hooks/useSelectBox';
import { useState } from 'react';
import { useUserAffiliationData } from '@/hooks/useUserData';
import { Guest, postGroomGuestInfo } from '@/api/guest/guestAPI';
import { useMutation } from '@tanstack/react-query';

export default function GuestGroomPage() {
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

  const { data: userData } = useUserAffiliationData();
  const sideList = userData?.user.groomSide || [];

  const broomGroupOptions = sideList?.map((side: string) => ({
    value: side,
    label: side,
  }));

  const [nameValue, setNameValue] = useState('');

  // 입력값 변경 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNameValue(value);
  };

  const { mutate: postGroomGuest } = useMutation({
    mutationFn: (guest: Guest) => postGroomGuestInfo(guest),
    onSuccess: (data) => {
      console.log('신랑측 하객 정보 등록 성공:', data);
    },
    onError: (error) => {
      console.error('신랑측 하객 정보 등록 실패:', error);
    },
  });

  const handleSubmit = () => {
    if (nameValue && selectedGroupOption) {
      const newGuest: Guest = {
        side: 'groom',
        guestName: nameValue,
        affiliation: selectedGroupOption.value,
        ticketCount: selectedTicketOption,
        giftAmount: null,
        note: '',
      };

      // 하객 등록 API 호출
      postGroomGuest(newGuest);

      // 폼 초기화
      setNameValue('');
      setSelectedGroupOption(null);
      setSelectedTicketOption(null);
      handleOpenModal();
    }
  };

  return (
    <GuestForm
      side="groom"
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
