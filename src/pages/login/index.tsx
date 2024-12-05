import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="mx-auto mb-[50px] mt-[150px] flex w-full flex-col gap-[20px] px-[30px] md:w-[500px]">
      <div className="mx-auto mb-[30px] w-[250px] md:w-[400px]">
        <Image
          src="/icons/logo_large.png"
          alt="메인 로고 아이콘"
          width={400}
          height={300}
        />
      </div>
      <div>
        <p className="text-md-regular">아이디</p>
        <Input
          placeholder="아이디를 입력해주세요."
          className="mt-[10px] text-md-regular"
        />
      </div>
      <div>
        <p className="text-md-regular">비밀번호</p>
        <Input
          placeholder="비밀번호를 입력해주세요."
          className="mt-[10px] text-md-regular"
        />
      </div>
      <Button
        textColor="white"
        textSize="20_bold"
        buttonHeight={60}
        className="mt-[30px]"
      >
        로그인하기
      </Button>
      <p className="text-right text-sm-regular md:text-md-regular">
        아직 회원이 아니신가요?{' '}
        <Link
          href={'/signup'}
          className="rounded-[12px] px-1 text-sm-extraBold text-text-orange hover:bg-[#ffa43531] md:text-md-extraBold"
        >
          회원가입하기
        </Link>
      </p>
    </div>
  );
}
