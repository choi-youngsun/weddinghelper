import { patchUserSetting } from '@/api/admin/settingAPI';
import { useAuth } from '@/components/@shared/AuthContext';
import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import Tag from '@/components/settings/Tag';
import { useUserAffiliationData } from '@/hooks/useUserData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export default function Setting() {
  const { isAuthenticated } = useAuth();

  const [selectedTag, setSelectedTag] = useState<'bride' | 'groom'>('bride');
  const [tagValue, setTagValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const queryClient = useQueryClient();

  const { data, isLoading } = useUserAffiliationData(isAuthenticated);
  const [isPending, setIsPending] = useState(false);

  const { mutate: patchAffiliation } = useMutation({
    mutationFn: ({
      side,
      affiliation,
      action,
    }: {
      side: string;
      affiliation: string;
      action: string;
    }) => patchUserSetting(side, affiliation, action),
    onSuccess: (data) => {
      console.log('소속 수정 성공:', data);
      setTagValue('');
    },
    onSettled: () => {
      // 쿼리 무효화 및 리패치
      queryClient.invalidateQueries({ queryKey: ['user', 'affiliation'] });
      setIsPending(false);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        }
        console.error('소속 수정 실패:', error);
        setIsPending(false);
      }
    },
  });

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 10) {
      setTagValue(value);
      setErrorMessage('');
    } else {
      setErrorMessage('10자 이하로 입력해주세요.');
    }
  };

  const handleTagSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsPending(true);
    event.preventDefault(); // 페이지 새로고침 방지
    if (selectedTag === 'bride') {
      patchAffiliation({
        side: 'brideSide',
        affiliation: tagValue,
        action: 'add',
      });
    } else if (selectedTag === 'groom') {
      patchAffiliation({
        side: 'groomSide',
        affiliation: tagValue,
        action: 'add',
      });
    }
  };

  const handleTagDelete = (selectedTag: string, tagValue: string) => {
    setIsPending(true);
    if (selectedTag === 'bride') {
      patchAffiliation({
        side: 'brideSide',
        affiliation: tagValue,
        action: 'remove',
      });
    } else if (selectedTag === 'groom') {
      patchAffiliation({
        side: 'groomSide',
        affiliation: tagValue,
        action: 'remove',
      });
    }
  };

  return (
    <div className="mx-auto mb-[50px] px-[20px] pt-[100px] md:w-[700px]">
      <p className="mb-[20px] text-lg-regular">하객 소속 목록 수정</p>
      <div className="flex">
        <div className="flex shrink-0 flex-col gap-1">
          <Button
            buttonWidth="fitToChildren"
            buttonStyle="left-round"
            buttonColor={selectedTag === 'bride' ? 'yellow' : 'white'}
            textColor={selectedTag === 'bride' ? 'black' : 'gray'}
            textSize="20"
            className="shrink-0 px-[10px]"
            onClick={() => setSelectedTag('bride')}
          >
            신부측
          </Button>
          <Button
            buttonWidth="fitToChildren"
            buttonStyle="left-round"
            buttonColor={selectedTag === 'groom' ? 'yellow' : 'white'}
            textColor={selectedTag === 'groom' ? 'black' : 'gray'}
            textSize="20"
            className="shrink-0 px-[10px]"
            onClick={() => setSelectedTag('groom')}
          >
            신랑측
          </Button>
        </div>
        <div className="flex h-[400px] flex-grow flex-col rounded-br-[16px] rounded-tr-[16px] border-2 border-button-yellow bg-white px-[10px] py-[20px]">
          <form
            onSubmit={handleTagSubmit}
            className="flex w-full items-center gap-2"
          >
            <Input
              className="flex-grow text-md-regular"
              height={50}
              placeholder="추가할 소속 입력"
              value={tagValue}
              onChange={handleTagChange}
            />
            <Button
              buttonWidth="fitToChildren"
              className="shrink-0"
              type="submit"
              disabled={tagValue === '' || errorMessage !== '' || isPending}
            >
              <p className="w-[70px]">{isPending ? '로딩..' : '추가'}</p>
            </Button>
          </form>
          <p className="ml-2 mt-1 text-button-red">{errorMessage}</p>
          <div className="mt-[10px] flex flex-wrap gap-3">
            {isLoading ? (
              <p className="ml-[10px] text-text-gray">Loading...</p>
            ) : selectedTag === 'bride' ? (
              // brideSide에 대한 조건 처리
              data?.user?.brideSide?.length ? (
                // brideSide가 있을 때
                data.user.brideSide.map((option: string) => (
                  <Tag
                    key={option}
                    value={option}
                    handleClick={() => handleTagDelete('bride', option)}
                  />
                ))
              ) : (
                // brideSide가 없을 때
                <p className="mx-auto mt-[100px] text-center text-text-gray">
                  아직 등록된 신부측 소속 정보가 없어요!
                </p>
              )
            ) : // groomSide에 대한 조건 처리
            data?.user?.groomSide?.length ? (
              // groomSide가 있을 때
              data.user.groomSide.map((option: string) => (
                <Tag
                  key={option}
                  value={option}
                  handleClick={() => handleTagDelete('groom', option)}
                />
              ))
            ) : (
              // groomSide가 없을 때
              <p className="mx-auto mt-[100px] text-center text-text-gray">
                아직 등록된 신랑측 소속 정보가 없어요!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
