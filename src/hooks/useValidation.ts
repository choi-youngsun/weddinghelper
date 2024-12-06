import { useState } from 'react';

interface ValidationError {
  [field: string]: { isError: boolean; message: string };
}

export const useValidation = () => {
  const [errors, setErrors] = useState<ValidationError>({});

  // 여러 field의 에러 상태를 관리
  const setError = (field: string, isError: boolean, message: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: { isError, message },
    }));
  };

  // 모달이 닫히는 등의 동작 시 에러 상태 초기화에 이용
  const clearError = (field: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: { isError: false, message: '' },
    }));
  };

  // onBlur 시 폼이 비어 있는지 검사
  const validateOnBlur = (field: string, value: any) => {
    if (!value) {
      setError(field, true, '필수 항목입니다!');
    } else {
      setError(field, false, '');
    }
  };

  // 이메일 유효성 검사 함수
  const validateName = (field: string, name: string) => {
    if (!name) {
      setError(field, true, '필수 항목입니다!');
    } else if (name.length > 10) {
      setError(field, true, '10자 이내로 입력해 주세요.');
    } else {
      setError(field, false, '');
    }
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (field: string, email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setError(field, true, '필수 항목입니다!');
    } else if (email.length > 50) {
      setError(field, true, '50자 이내로 입력해 주세요.');
    } else if (!emailRegex.test(email)) {
      setError(field, true, '이메일 형식으로 작성해 주세요.');
    } else {
      setError(field, false, '');
    }
  };

  // 비밀번호 유효성 검사
  const validatePassword = (field: string, password: string) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
    if (!password) {
      setError(field, true, '필수 항목입니다!');
    } else if (password.length < 8 || password.length > 20) {
      setError(field, true, '8자 이상 20자 이하로 설정해주세요.');
    } else if (!passwordRegex.test(password)) {
      setError(field, true, '숫자, 영문, 특수문자가 포함되어야 합니다.');
    } else {
      setError(field, false, '');
    }
  };

  const passwordConfirmation = (
    field: string,
    password: string,
    passwordValue: string
  ) => {
    if (!password) {
      setError(field, true, '비밀번호를 먼저 입력해주세요.');
    } else if (!passwordValue) {
      setError(field, true, '비밀번호를 다시 한 번 입력해주세요.');
    } else if (password !== passwordValue) {
      setError(field, true, '비밀번호가 일치하지 않습니다.');
    } else {
      setError(field, false, '');
    }
  };

  return {
    errors,
    setError,
    clearError,
    validateOnBlur,
    validateName,
    validateEmail,
    validatePassword,
    passwordConfirmation,
  };
};
