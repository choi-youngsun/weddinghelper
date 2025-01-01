import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import Tag from '@/components/settings/Tag';
import { useState } from 'react';

export default function Setting() {
  const [selectedTag, setSelectedTag] = useState<'bride' | 'broom'>('bride');
  const [tagValue, setTagValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const brideGroupOptions = [
    { label: '대학교', value: '대학교' },
    { label: '가족', value: '가족' },
    { label: '중/고등학교', value: '중/고등학교' },
    { label: '초등학교', value: '초등학교' },
    { label: '직장', value: '직장' },
    { label: '기타', value: '기타' },
  ];

  const broomGroupOptions = [
    { label: '가족', value: '가족' },
    { label: '대학교', value: '대학교' },
    { label: '교회', value: '교회' },
    { label: '중/고등학교', value: '중/고등학교' },
    { label: '커스트', value: '커스트' },
    { label: '직장', value: '직장' },
    { label: '기타', value: '기타' },
  ];

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
  const handleTagSubmit = (
    options: { label: string; value: string }[],
    inputValue: string
  ) => {
    // 입력 값이 비어 있는 경우 동작하지 않음
    if (!inputValue.trim()) return;

    // 이미 존재하는 값인지 확인
    const isDuplicate = options.some(
      (option) => option.label === inputValue && option.value === inputValue
    );

    if (isDuplicate) {
      alert('이미 존재하는 태그입니다.');
      return;
    }

    // 새로운 객체를 만들어 배열 마지막에 추가
    const newOption = { label: inputValue, value: inputValue };
    options.push(newOption);

    console.log('Updated Options:', options); // 디버깅용 콘솔
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
            buttonColor={selectedTag === 'broom' ? 'yellow' : 'white'}
            textColor={selectedTag === 'broom' ? 'white' : 'black'}
            textSize="20"
            className="shrink-0 px-[10px]"
            onClick={() => setSelectedTag('broom')}
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
              onClick={() => {
                if (selectedTag === 'bride') {
                  handleTagSubmit(brideGroupOptions, tagValue);
                } else if (selectedTag === 'broom') {
                  handleTagSubmit(broomGroupOptions, tagValue);
                }
              }}
              disabled={tagValue === '' || errorMessage !== ''}
            >
              추가
            </Button>
          </div>
          <div className="mt-[20px] flex flex-wrap gap-3">
            {selectedTag === 'bride'
              ? brideGroupOptions.map((option) => (
                  <Tag key={option.value} value={option.label} />
                ))
              : broomGroupOptions.map((option) => (
                  <Tag key={option.value} value={option.label} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
