import { Guest, postBrideGuestInfo } from '@/api/guest/guestAPI';
import GuestForm from '@/components/guest/GuestForm';
import { useModal } from '@/hooks/useModal';
import { useRadioButton } from '@/hooks/useRadioButton';
import { useSelectBox } from '@/hooks/useSelectBox';
import { useUserAffiliationData } from '@/hooks/useUserData';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface UserData {
  _id: string; // MongoDB ObjectId 타입
  name: string;
  email: string;
  brideSide: string[]; // 신부측 소속 정보
  groomSide: string[]; // 신랑측 소속 정보
}

export interface QueryResponse {
  message: string;
  user: UserData;
}

export default function GuestBridePage() {
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
  const { data: userData } = useUserAffiliationData();
  const sideList = userData?.user.brideSide || [];

  const groupOptions = sideList?.map((side: string) => ({
    value: side,
    label: side,
  }));

  const handleOpenModal = () => {
    onOpen();

    // 3초 뒤에 모달 닫기
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const [nameValue, setNameValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 입력값 변경 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNameValue(value);
    setError(null);
  };

  const { mutate: postBrideGuest } = useMutation({
    mutationFn: (guest: Guest) => postBrideGuestInfo(guest),
    onSuccess: (data) => {
      console.log('신부측 하객 정보 등록 성공:', data);

      // 폼 초기화
      setNameValue('');
      setError(null);
      setSelectedGroupOption(null);
      setSelectedTicketOption(null);
      handleOpenModal();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        }
        console.error('신부측 하객 정보 등록 실패:', error);
      }
    },
  });

  const handleSubmit = () => {
    if (nameValue && selectedGroupOption) {
      const newGuest: Guest = {
        side: 'bride',
        guestName: nameValue,
        affiliation: selectedGroupOption.value,
        ticketCount: selectedTicketOption,
        giftAmount: null,
        note: '',
      };

      // 하객 등록 API 호출
      postBrideGuest(newGuest);
    }
  };

  return (
    <GuestForm
      side="bride"
      nameValue={nameValue}
      onNameChange={handleNameChange}
      groupOptions={groupOptions}
      selectedGroupOption={selectedGroupOption}
      selectedTicketOption={selectedTicketOption}
      handleGroupSelect={handleGroupSelect}
      handleTicketSelect={handleTicketSelect}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      error={error}
    />
  );
}
