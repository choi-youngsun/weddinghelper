import Input from '@/components/@shared/Input';
import SelectBox from '@/components/@shared/SelectBox';

export default function GuestBridePage() {
  const sideOptions = [
    { label: '대학교', value: '대학교' },
    { label: '가족', value: '가족' },
    { label: '교회', value: '교회' },
    { label: '중/고등학교', value: '중/고등학교' },
    { label: '동호회', value: '동호회' },
    { label: '직장', value: '직장' },
    { label: '기타', value: '기타' },
  ];

  return (
    <div className="mx-auto mb-[50px] md:w-[500px]">
      <form className="flex w-full flex-col gap-[20px] px-[30px]">
        <p className="mt-[100px] text-center text-lg-regular">신부측</p>
        <div>
          <p className="text-md-regular">이름</p>
          <Input placeholder="이름을 입력하세요." />
        </div>
        <div>
          <p className="text-md-regular">소속</p>
          <SelectBox options={sideOptions} />
        </div>
        <div>
          <p className="text-md-regular">식권</p>
          <div>1 2 3 4 5 6</div>
        </div>
      </form>
    </div>
  );
}
