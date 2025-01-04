import { postLogIn } from '@/api/auth/authAPI';
import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
    setError(''); // 입력값이 변경될 때마다 에러를 초기화
  };

  const { mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postLogIn(email, password),
    onSuccess: (data) => {
      console.log('로그인 성공!');
      router.push('/'); // 로그인 성공 시 홈으로 이동
      localStorage.setItem('user', JSON.stringify(data.user)); // 유저 정보를 로컬 스토리지에 저장
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      setError('이메일 또는 비밀번호를 다시 확인해주세요.');
    },
  });

  const handleSubmit = async () => {
    try {
      await login({ email: formFields.email, password: formFields.password });
      setFormFields({ email: '', password: '' });
    } catch {
      setError('이메일 또는 비밀번호를 다시 확인해주세요.');
    }
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
          errorMessage={error}
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
          errorMessage={error}
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
