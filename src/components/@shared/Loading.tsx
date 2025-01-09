import Image from 'next/image';

export default function Loading() {
  return (
    <div className="mx-auto my-auto animate-fadeInOut">
      <Image
        src="/images/loading.png"
        alt="보석 아이콘"
        width={100}
        height={50}
      ></Image>
    </div>
  );
}
