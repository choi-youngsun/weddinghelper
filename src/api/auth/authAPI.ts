import { axiosInstance, publicAxiosInstance } from '../axiosInstance';

// 회원가입 API
export const postSignUp = async (
  name: string,
  email: string,
  password: string,
  passwordCheck: string
) => {
  const response = await publicAxiosInstance.post('auth/signup', {
    name,
    email,
    password,
    passwordCheck,
  });
  return response.data;
};

// 로그인 API
export const postLogIn = async (email: string, password: string) => {
  const response = await axiosInstance.post('auth/login', {
    email,
    password,
  });
  return response.data;
};

//로그아웃 API
export const postLogOut = async () => {
  const response = await axiosInstance.post('auth/logout');
  return response.data;
};

// 액세스 토큰 재발급 API
export const postRefreshToken = async () => {
  const response = await axiosInstance.post('auth/refresh-token');
  return response.data;
};
