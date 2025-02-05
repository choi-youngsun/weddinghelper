import { Guest } from '@/api/guest/guestAPI';
import { useAuth } from '@/components/@shared/AuthContext';
import { DropdownOption } from '@/components/@shared/Dropdown';
import GuestForm from '@/components/guest/GuestForm';
import { useModal } from '@/hooks/useModal';
import { useRadioButton } from '@/hooks/useRadioButton';
import { useSelectBox } from '@/hooks/useSelectBox';
import { useUserAffiliationData } from '@/hooks/useUserData';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface GuestPageProps {
  side: 'groom' | 'bride';
  postGuestInfo: (guest: Guest) => Promise<any>;
}

export default function GuestPage({ side, postGuestInfo }: GuestPageProps) {
  const { isAuthenticated } = useAuth();
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
  const { data: userData } = useUserAffiliationData(isAuthenticated);
  const router = useRouter();

  // 신랑측 또는 신부측 소속 리스트 가져오기
  const sideList =
    side === 'groom'
      ? userData?.user?.groomSide || []
      : userData?.user?.brideSide || [];
  const groupOptions =
    sideList.length > 0
      ? sideList.map((side: string) => ({
          value: side,
          label: side,
        }))
      : [{ value: '등록', label: '소속 정보를 등록하려면 클릭하세요.' }];

  // '등록' 선택 시 세팅 페이지로 이동
  const customHandleSelect = (value: DropdownOption) => {
    if (value.value === '등록') {
      router.push('/admin/setting');
    } else {
      handleGroupSelect(value);
    }
  };

  const handleOpenModal = () => {
    onOpen();
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const [nameValue, setNameValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
    setError(null);
  };

  const { mutate: postGuest } = useMutation({
    mutationFn: (guest: Guest) => postGuestInfo(guest),
    onSuccess: () => {
      setNameValue('');
      setError(null);
      setSelectedGroupOption(null);
      setSelectedTicketOption(null);
      handleOpenModal();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      }
    },
  });

  const handleSubmit = () => {
    if (nameValue && selectedGroupOption) {
      const newGuest: Guest = {
        side,
        guestName: nameValue,
        affiliation: selectedGroupOption.value,
        ticketCount: selectedTicketOption,
        giftAmount: null,
        note: '',
      };
      postGuest(newGuest);
    }
  };

  return (
    <GuestForm
      side={side}
      nameValue={nameValue}
      onNameChange={handleNameChange}
      groupOptions={groupOptions}
      selectedGroupOption={selectedGroupOption}
      selectedTicketOption={selectedTicketOption}
      handleGroupSelect={customHandleSelect}
      handleTicketSelect={handleTicketSelect}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      error={error}
    />
  );
}
