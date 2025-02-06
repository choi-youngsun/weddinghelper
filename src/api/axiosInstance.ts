import axios from 'axios';

export const publicAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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

    // `_retryCount`가 없으면 0으로 초기화
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    // 401 에러(액세스 토큰 만료)일 때만 리프레시 토큰을 사용하여 액세스 토큰 갱신
    if (error.response?.status === 401 && originalRequest._retryCount < 2) {
      originalRequest._retryCount += 1; // 재시도 횟수 증가

      try {
        // 리프레시 토큰을 이용해 새 액세스 토큰을 요청
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`
        );

        if (response.status === 200) {
          return axiosInstance(originalRequest); // 요청 재시도
        } else {
          return Promise.reject('리프레시 토큰 갱신 실패');
        }
      } catch (refreshError) {
        console.error('리프레시 토큰 요청 실패:', refreshError);

        // 리프레시 토큰 실패 시, 더 이상 원본 요청을 재시도하지 않도록 처리
        return Promise.reject(refreshError); // 원본 요청 중단
      }
    }

    // 그 외의 에러는 그대로 반환
    return Promise.reject(error);
  }
);

export default axiosInstance;
