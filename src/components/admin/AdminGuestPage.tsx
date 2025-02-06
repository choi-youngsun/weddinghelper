import {
  deleteBrideGuestInfo,
  deleteGroomGuestInfo,
  Guest,
  patchBrideGuestInfo,
  patchGroomGuestInfo,
} from '@/api/guest/guestAPI';
import { useAuth } from '@/components/@shared/AuthContext';
import Button from '@/components/@shared/Button';
import Loading from '@/components/@shared/Loading';
import { GuestInfo } from '@/components/admin/AdminGuestForm';
import AdminGuestTable from '@/components/admin/AdminGuestTable';
import { useBrideGuestData, useGroomGuestData } from '@/hooks/useUserData';
import { downloadList } from '@/utils/downloadExcel';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

interface AdminGuestPageProps {
  side: 'bride' | 'groom';
}

export default function AdminGuestPage({ side }: AdminGuestPageProps) {
  const { isAuthenticated } = useAuth();
  const [editModeId, setEditModeId] = useState<string | null>(null);

  // side에 따라 적절한 훅을 선택
  const useGuestData = side === 'bride' ? useBrideGuestData : useGroomGuestData;
  const { data, isLoading, isError, refetch } = useGuestData(
    editModeId !== null,
    isAuthenticated
  );

  const guestList =
    side === 'bride' ? data?.user?.brideGuests : data?.user?.groomGuests;
  const [guests, setGuests] = useState<GuestInfo[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading) {
      setGuests(guestList || []);
    }
  }, [guestList, isLoading]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [guests]);

  const handleChange = (id: string, name: string, value: string | number) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest._id === id ? { ...guest, [name]: value } : guest
      )
    );
  };

  const patchGuestInfo =
    side === 'bride' ? patchBrideGuestInfo : patchGroomGuestInfo;
  const deleteGuestInfo =
    side === 'bride' ? deleteBrideGuestInfo : deleteGroomGuestInfo;
  const queryKey = [`${side}Guest`];

  const { mutate: patchGuestData } = useMutation({
    mutationFn: ({ guestId, guest }: { guestId: string; guest: Guest }) =>
      patchGuestInfo(guestId, guest),
    onSuccess: () => setEditModeId(null),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
    onError: (error) => console.error('하객 정보 수정 실패:', error),
  });

  const { mutate: deleteGuestData } = useMutation({
    mutationFn: (guestId: string) => deleteGuestInfo(guestId),
    onSuccess: () => setEditModeId(null),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
    onError: (error) => console.error('하객 삭제 실패:', error),
  });

  const handleEditClick = (id: string) => {
    if (editModeId === id) {
      const guestToUpdate = guests.find((guest) => guest._id === id);
      if (guestToUpdate) {
        const { side, guestName, affiliation, giftAmount, ticketCount, note } =
          guestToUpdate;
        const guestData: Guest = {
          side,
          guestName,
          affiliation,
          giftAmount,
          ticketCount,
          note,
        };
        patchGuestData({ guestId: guestToUpdate._id, guest: guestData });
      }
      setEditModeId(null);
    } else {
      setEditModeId(id);
    }
  };

  const handleDeleteClick = (id: string) => {
    deleteGuestData(id);
  };

  const handleFetchClick = async () => {
    try {
      await refetch(); // refetch 호출
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };

  return (
    <div className="ml-0 flex flex-col items-center overflow-x-scroll px-[20px] py-[80px] xl:w-[1280px]">
      <div className="mb-[20px] flex w-full items-center justify-between">
        <p className="text-md-regular">
          {side === 'bride' ? '신부측' : '신랑측'} 관리자 페이지
        </p>
        <Button
          onClick={() =>
            downloadList(
              guests,
              `${side === 'bride' ? '신부측' : '신랑측'} 하객 정보`
            )
          }
          buttonColor={side === 'bride' ? 'pink' : 'blue'}
          buttonWidth="fitToChildren"
          buttonHeight={35}
          className="px-[5px] text-[14px]"
        >
          📑 엑셀로 내보내기
        </Button>
      </div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div className="text-center text-red-500">
          하객 정보를 불러오는 중 문제가 발생했습니다.
        </div>
      ) : (
        <>
          <div
            ref={scrollContainerRef}
            className="w-full overflow-scroll rounded-lg bg-[#ffffff52] md:max-h-[700px] xl:max-h-[600px]"
          >
            <AdminGuestTable
              guestList={guests}
              editModeId={editModeId}
              side={side}
              onChange={handleChange}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          </div>
          <Button
            buttonColor={side === 'bride' ? 'pink' : 'blue'}
            buttonWidth="fitToChildren"
            onClick={handleFetchClick}
            className="mt-3 px-10"
          >
            목록 새로고침
          </Button>
        </>
      )}
    </div>
  );
}
