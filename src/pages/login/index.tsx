import { getUserSetting } from '@/api/admin/settingAPI';
import { postLogIn } from '@/api/auth/authAPI';
import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Login() {
  const router = useRouter();

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
    setError(''); // 입력값이 변경될 때마다 에러를 초기화
  };

  const queryClient = useQueryClient();

  const { mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postLogIn(email, password),
    onSuccess: async () => {
      // async로 선언하여 await 사용 가능
      console.log('로그인 성공!');

      // 로그인 성공 후 홈으로 이동
      router.push('/home');

      // 사용자 정보를 가져와서 쿼리 데이터에 저장
      const userData = await getUserSetting(); // 사용자 정보 요청

      // 'user' 쿼리에 저장
      queryClient.setQueryData(['user'], userData);

      // 로컬 스토리지에 유저 정보 저장
      localStorage.setItem('user', JSON.stringify(userData));
    },
    onSettled: () => {
      setIsLoading(false); // 요청 종료 후 로딩 상태 해제
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        }
        console.error('로그인 실패:', error);
      }
    },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // 로컬 스토리지에서 유저 데이터 가져오기
      const userData = JSON.parse(storedUser);

      // 'user' 쿼리에 저장
      queryClient.setQueryData(['user'], userData);
    }
  }, [queryClient]); // 페이지가 처음 로드될 때 실행

  const handleSubmit = async () => {
    setIsLoading(true); // 요청 시작 시 로딩 상태 활성화
    setError(''); // 이전 오류 메시지 초기화
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
    <div className="mx-auto flex w-full flex-col gap-[20px] px-[30px] md:w-[500px]">
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
        {isLoading ? '로그인 중...' : '로그인하기'}
      </Button>
      <p className="mb-[100px] text-right text-sm-regular md:text-md-regular">
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
