import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 함께 전송
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add custom headers or modify the request config here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러(액세스 토큰 만료)일 때만 리프레시 토큰을 사용하여 액세스 토큰을 갱신
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // 리프레시 토큰을 이용해 새 액세스 토큰을 요청
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`
        );
        return axios(originalRequest); // 요청 재시도
      } catch (refreshError) {
        // 리프레시 토큰이 실패하면 로그아웃 등의 처리를 할 수 있습니다.
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 그 외의 에러는 그대로 반환
  }
);

export default axiosInstance;
