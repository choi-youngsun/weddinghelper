import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  // API연결 이후 유효성 검사 추가 예정
  // 필드 상태를 객체로 관리
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(formFields);
    setFormFields({
      email: '',
      password: '',
    });
  };

  const isAllInputFilled = () => {
    return Object.values(formFields).every((value) => value.trim() !== '');
  };

  return (
    <div className="mx-auto mb-[50px] flex w-full flex-col gap-[20px] px-[30px] md:w-[500px]">
      <div className="mx-auto mb-[30px] mt-[150px]  w-[250px] md:w-[400px]">
        <Image
          src="/icons/logo_large.png"
          alt="메인 로고 아이콘"
          width={400}
          height={300}
        />
      </div>
      <div>
        <p className="text-md-regular">이메일</p>
        <Input
          placeholder="이메일을 입력해주세요."
          className="mt-[10px] text-md-regular"
          name="email"
          value={formFields.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="text-md-regular">비밀번호</p>
        <Input
          placeholder="비밀번호를 입력해주세요."
          className="mt-[10px] text-md-regular"
          type="password"
          name="password"
          value={formFields.password}
          onChange={handleChange}
        />
      </div>
      <Button
        textColor="white"
        textSize="20_bold"
        buttonHeight={60}
        className="mt-[30px]"
        onClick={handleSubmit}
        disabled={!isAllInputFilled()}
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
