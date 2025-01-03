import axiosInstance from '../axiosInstance';

// 회원가입 API
export const postSignUp = async (
  name: string,
  email: string,
  password: string,
  passwordCheck: string
) => {
  const response = await axiosInstance.post('auth/signup', {
    name,
    email,
    password,
    passwordCheck,
  });
  return response.data;
};
