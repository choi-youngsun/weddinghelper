import { getUserSetting, patchUserSetting } from '@/api/admin/settingAPI';
import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import Tag from '@/components/settings/Tag';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function Setting() {
  const [selectedTag, setSelectedTag] = useState<'bride' | 'groom'>('bride');
  const [tagValue, setTagValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserSetting(),
  });

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
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      setErrorMessage('이미 추가된 소속입니다.');
      console.error('소속 수정 실패:', error);
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

  //추후 API요청으로 변경, 현재는 동작 안함
  const handleTagSubmit = (selectedTag: string, tagValue: string) => {
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
            textColor={selectedTag === 'bride' ? 'white' : 'black'}
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
            textColor={selectedTag === 'groom' ? 'white' : 'black'}
            textSize="20"
            className="shrink-0 px-[10px]"
            onClick={() => setSelectedTag('groom')}
          >
            신랑측
          </Button>
        </div>
        <div className="flex h-[400px] flex-grow flex-col rounded-br-[16px] rounded-tr-[16px] border-2 border-button-yellow bg-white px-[10px] py-[20px]">
          <div className="flex w-full items-center gap-2">
            <Input
              className="flex-grow text-md-regular"
              height={50}
              placeholder="추가할 소속 입력"
              value={tagValue}
              onChange={handleTagChange}
              errorMessage={errorMessage}
            />
            <Button
              buttonWidth="fitToChildren"
              className="shrink-0 px-[20px]"
              onClick={() => handleTagSubmit(selectedTag, tagValue)}
              disabled={tagValue === '' || errorMessage !== ''}
            >
              추가
            </Button>
          </div>
          <div className="mt-[20px] flex flex-wrap gap-3">
            {selectedTag === 'bride'
              ? data?.user.brideSide.map((option: string) => (
                  <Tag
                    key={option}
                    value={option}
                    handleClick={() => handleTagDelete('bride', option)}
                  />
                ))
              : data?.user.groomSide.map((option: string) => (
                  <Tag
                    key={option}
                    value={option}
                    handleClick={() => handleTagDelete('groom', option)}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
