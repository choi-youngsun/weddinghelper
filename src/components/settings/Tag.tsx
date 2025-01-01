import Image from 'next/image';

type TagProps = {
  value: string;
};

export default function Tag({ value }: TagProps) {
  return (
    <div className="flex w-fit shrink-0 items-center gap-3 rounded-[20px] border-2 border-button-yellow px-[10px] py-[3px]">
      <p>{value}</p>
      <button className="flex h-[30px] w-fit items-center justify-center text-center text-button-red">
        <Image src="/icons/button_x.png" alt="x 아이콘" width={8} height={8} />
      </button>
    </div>
  );
}
