import GuestForm from '@/components/guest/GuestForm';
import { useModal } from '@/hooks/useModal';
import { useRadioButton } from '@/hooks/useRadioButton';
import { useSelectBox } from '@/hooks/useSelectBox';
import { useState } from 'react';
import { useUserAffiliationData } from '@/hooks/useUserData';
import { Guest, postGroomGuestInfo } from '@/api/guest/guestAPI';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { DropdownOption } from '@/components/@shared/Dropdown';

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
  const broomGroupOptions =
    sideList.length > 0
      ? sideList.map((side: string) => ({
          value: side,
          label: side,
        }))
      : [
          {
            value: '등록',
            label: '소속 정보를 등록하려면 클릭하세요.',
          },
        ];

  const router = useRouter();

  // 커스터마이즈된 handleSelect 함수
  const customHandleSelect = (value: DropdownOption) => {
    if (value.value === '등록') {
      router.push('/admin/setting'); // 등록 선택 시 세팅 페이지로 이동
    } else {
      handleGroupSelect(value); // 기본 동작 수행
    }
  };

  const [nameValue, setNameValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 입력값 변경 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNameValue(value);
    setError(null);
  };

  const { mutate: postGroomGuest } = useMutation({
    mutationFn: (guest: Guest) => postGroomGuestInfo(guest),
    onSuccess: (data) => {
      console.log('신랑측 하객 정보 등록 성공:', data);

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
        console.error('신랑측 하객 정보 등록 실패:', error);
      }
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
    }
  };

  return (
    <>
      <GuestForm
        side="groom"
        nameValue={nameValue}
        onNameChange={handleNameChange}
        groupOptions={broomGroupOptions}
        selectedGroupOption={selectedGroupOption}
        selectedTicketOption={selectedTicketOption}
        handleGroupSelect={customHandleSelect}
        handleTicketSelect={handleTicketSelect}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
        error={error}
      />
    </>
  );
}
