import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="mx-auto mb-[50px] mt-[100px] flex w-full flex-col gap-[20px] px-[30px] md:w-[500px]">
      <p className="text-center text-lg-regular">회원가입</p>
      <div>
        <p className="text-md-regular">이름</p>
        <Input
          placeholder="이름을 입력해주세요."
          className="mt-[10px] text-md-regular"
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
      <div>
        <p className="text-md-regular">비밀번호 확인</p>
        <Input
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          className="mt-[10px] text-md-regular"
        />
      </div>
      <Button
        textColor="white"
        textSize="20_bold"
        buttonHeight={60}
        className="mt-[30px]"
      >
        회원가입하기
      </Button>
      <p className="text-right text-sm-regular md:text-md-regular">
        이미 회원이신가요?
        <Link
          href={'/login'}
          className="rounded-[12px] px-1 text-sm-extraBold text-text-orange hover:bg-[#ffa43531] md:text-md-extraBold"
        >
          로그인하기
        </Link>
      </p>
    </div>
  );
}
