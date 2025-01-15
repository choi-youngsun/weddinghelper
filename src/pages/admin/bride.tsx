import { GuestInfo } from '@/components/admin/AdminGuestForm';
import AdminGuestTable from '@/components/admin/AdminGuestTable';
import { useBrideGuestData } from '@/hooks/useUserData';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function AdminBride() {
  const { data, isLoading } = useBrideGuestData();
  console.log(data);
  const brideGuest = data?.user?.brideGuests;
  const [guests, setGuests] = useState<GuestInfo[]>(brideGuest); // 전체 리스트 관리
  const [editModeId, setEditModeId] = useState<string | null>(null); // 수정 모드 상태
  const queryClient = useQueryClient();

  const handleChange = (id: number, name: string, value: string | number) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.orderNumber === id ? { ...guest, [name]: value } : guest
      )
    );
  };

  const handleEditClick = (id: string) => {
    if (editModeId === id) {
      // 저장 로직
      console.log(guests.find((guest) => guest._id === id));
      setEditModeId(null);
    } else {
      setEditModeId(id);
    }
  };

  const handleDeleteClick = (id: string) => {
    console.log(id, '번째 하객 삭제!');
  };

  return (
    <div className="mx-auto mb-[100px] px-[20px] py-[80px] xl:w-[1280px]">
      <p className="mb-[20px] text-md-regular">신부측 관리자 페이지</p>
      <AdminGuestTable
        guestList={brideGuest}
        editModeId={editModeId}
        side="bride"
        onChange={handleChange}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  );
}
