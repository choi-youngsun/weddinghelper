import {
  deleteGroomGuestInfo,
  Guest,
  patchGroomGuestInfo,
} from '@/api/guest/guestAPI';
import Button from '@/components/@shared/Button';
import Loading from '@/components/@shared/Loading';
import { GuestInfo } from '@/components/admin/AdminGuestForm';
import AdminGuestTable from '@/components/admin/AdminGuestTable';
import { useGroomGuestData } from '@/hooks/useUserData';
import { downloadList } from '@/utils/downloadExcel';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

export default function AdminGroom() {
  const [editModeId, setEditModeId] = useState<string | null>(null); // 수정 모드 상태
  const { data, isLoading, isError, refetch } = useGroomGuestData(
    editModeId !== null
  );

  const groomGuest = data?.user?.groomGuests || [];
  const [guests, setGuests] = useState<GuestInfo[]>([]); // 전체 리스트 관리

  const scrollContainerRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 참조

  const queryClient = useQueryClient();

  // 데이터가 로드될 때 상태를 업데이트
  useEffect(() => {
    if (!isLoading) {
      setGuests(groomGuest);
    }
  }, [groomGuest, isLoading]);

  useEffect(() => {
    // 새로운 데이터가 추가되면 스크롤을 맨 아래로 내림
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [guests]); // guests 상태가 변경될 때마다 실행

  const handleChange = (id: string, name: string, value: string | number) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest._id === id ? { ...guest, [name]: value } : guest
      )
    );
  };

  const { mutate: patchGroomGuestData } = useMutation({
    mutationFn: ({ guestId, guest }: { guestId: string; guest: Guest }) =>
      patchGroomGuestInfo(guestId, guest),
    onSuccess: (data) => {
      console.log('하객 정보 수정 성공:', data);
      setEditModeId(null);
    },
    onSettled: () => {
      // 쿼리 무효화 및 리패치
      queryClient.invalidateQueries({ queryKey: ['GroomGuest'] });
    },
    onError: (error) => {
      console.error('하객 삭제 실패:', error);
    },
  });

  const { mutate: deleteGroomGuestData } = useMutation({
    mutationFn: (guestId: string) => deleteGroomGuestInfo(guestId),
    onSuccess: (data) => {
      console.log('하객 정보 삭제 성공:', data);
      setEditModeId(null);
    },
    onSettled: () => {
      // 쿼리 무효화 및 리패치
      queryClient.invalidateQueries({ queryKey: ['GroomGuest'] });
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
  });

  const handleEditClick = (id: string) => {
    if (editModeId === id) {
      // 저장 로직
      const guestToUpdate = guests?.find((guest) => guest._id === id);
      if (guestToUpdate) {
        // Guest 인터페이스에 맞는 데이터만 추출
        const { side, guestName, affiliation, giftAmount, ticketCount, note } =
          guestToUpdate;

        // Guest 타입으로 데이터 구성
        const guestData: Guest = {
          side,
          guestName,
          affiliation,
          giftAmount,
          ticketCount,
          note,
        };

        // 패치 요청 보내기
        patchGroomGuestData({ guestId: guestToUpdate._id, guest: guestData });
      }
      setEditModeId(null);
    } else {
      setEditModeId(id);
    }
  };

  const handleFetchClick = async () => {
    try {
      await refetch(); // refetch 호출
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };

  const handleDeleteClick = (id: string) => {
    deleteGroomGuestData(id);
    console.log(id, '번째 하객 삭제!');
  };

  return (
    <div className="mx-auto flex flex-col items-center px-[20px] py-[80px] xl:w-[1280px]">
      <div className="mb-[20px] flex w-full items-center justify-between ">
        <p className="text-md-regular">신랑측 관리자 페이지</p>
        <Button
          onClick={() => downloadList(guests, '신랑측 하객 정보')}
          buttonColor="blue"
          buttonWidth="fitToChildren"
          buttonHeight={35}
          className="px-[5px] text-[14px]"
        >
          📑엑셀로 내보내기
        </Button>
      </div>
      {isLoading ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        </div>
      ) : isError ? (
        <div className="text-center text-red-500">
          하객 정보를 불러오는 중 문제가 발생했습니다.
        </div>
      ) : (
        <>
          <div
            ref={scrollContainerRef}
            className="overflow-y-scroll rounded-lg bg-[#ffffff52] md:max-h-[700px] xl:max-h-[600px]"
          >
            <AdminGuestTable
              guestList={guests}
              editModeId={editModeId}
              side="groom"
              onChange={handleChange}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          </div>
          <Button
            buttonColor="blue"
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
