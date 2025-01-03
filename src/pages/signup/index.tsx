import { useValidation } from '@/hooks/useValidation';
import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import Link from 'next/link';
import { useState } from 'react';

export default function SignUp() {
  // API연결 이후 유효성 검사 추가 예정
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

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));

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

  const handleSubmit = () => {
    console.log(formFields);
    setFormFields({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
