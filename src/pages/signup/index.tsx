import { useValidation } from '@/hooks/useValidation';
import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAuthStatus, postLogIn, postSignUp } from '@/api/auth/authAPI';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getUserSetting } from '@/api/admin/settingAPI';

export default function SignUp() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    errors,
    clearError,
    validateName,
    validateEmail,
    validatePassword,
    passwordConfirmation,
  } = useValidation();

  // 필드 상태를 객체로 관리
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
    setError(null);

    // 입력값에 따라 에러를 업데이트
    switch (name) {
      case 'name':
        if (value.trim().length > 0) {
          clearError(name); // 입력값이 유효할 때만 에러를 제거
        }
        break;
      case 'email':
        validateEmail(name, value); // 유효하지 않은 경우 에러 설정
        break;
      case 'password':
        validatePassword(name, value);
        break;
      case 'confirmPassword':
        passwordConfirmation(name, value, formFields.password);
        break;
      default:
        break;
    }
  };

  const { mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postLogIn(email, password),
    onSuccess: async () => {
      console.log('로그인 성공!');
      setError(null);
      router.push('/home'); // 로그인 성공 시 홈으로 이동
      // 사용자 정보를 가져와서 쿼리 데이터에 저장
      const userData = await getUserSetting(['name']); // 사용자 정보 요청

      // 'user' 쿼리에 저장
      queryClient.setQueryData(['user'], userData);

      // 로컬 스토리지에 유저 정보 저장
      localStorage.setItem('user', JSON.stringify(userData));
      fetchAuthStatus();
      queryClient.invalidateQueries({ queryKey: ['authStatus'] });
    },
    onSettled: () => {
      setIsLoading(false); // 요청 종료 후 로딩 상태 해제
    },
    onError: (error) => {
      setIsLoading(false);
      console.error('로그인 실패:', error);
    },
  });

  const { mutate: signup } = useMutation({
    mutationFn: ({
      name,
      email,
      password,
      passwordCheck,
    }: {
      name: string;
      email: string;
      password: string;
      passwordCheck: string;
    }) => postSignUp(name, email, password, passwordCheck),
    onSuccess: (data) => {
      const name = data.user.name;
      console.log(`${name} 유저의 회원가입 성공!`);
      login({ email: formFields.email, password: formFields.password });
      setFormFields({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        }
        setIsLoading(false);
        console.error('회원가입 실패:', error);
      }
    },
  });

  const handleSubmit = () => {
    setIsLoading(true); // 요청 시작 시 로딩 상태 활성화
    setError(''); // 이전 오류 메시지 초기화
    signup({
      name: formFields.name,
      email: formFields.email,
      password: formFields.password,
      passwordCheck: formFields.confirmPassword,
    });
  };

  const isAllInputFilled = () => {
    const areFieldsFilled = Object.values(formFields).every(
      (value) => value.trim() !== ''
    );

    const hasNoErrors = Object.values(errors).every((error) => !error.isError);

    return areFieldsFilled && hasNoErrors;
  };

  return (
    <div className="mx-auto mb-[50px] flex w-full flex-col gap-[20px] px-[30px] md:w-[500px]">
      <p className="mt-[100px] text-center text-lg-regular">회원가입</p>
      <div>
        <p className="text-md-regular">이름</p>
        <Input
          placeholder="이름을 입력해주세요."
          className="mt-[10px] text-md-regular"
          name="name"
          value={formFields.name}
          onChange={handleChange}
          onBlur={() => validateName('name', formFields.name)}
          errorMessage={errors.name?.message}
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
          onBlur={() => validateEmail('email', formFields.email)}
          errorMessage={errors.email?.message}
        />
        <p className="ml-2 mt-1 text-button-red">{error}</p>
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
          onBlur={() => validatePassword('password', formFields.password)}
          errorMessage={errors.password?.message}
        />
      </div>
      <div>
        <p className="text-md-regular">비밀번호 확인</p>
        <Input
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          className="mt-[10px] text-md-regular"
          type="password"
          name="confirmPassword"
          value={formFields.confirmPassword}
          onChange={handleChange}
          onBlur={() =>
            passwordConfirmation(
              'confirmPassword',
              formFields.password,
              formFields.confirmPassword
            )
          }
          errorMessage={errors.confirmPassword?.message}
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
        {isLoading ? '회원가입 중...' : '회원가입하기'}
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
