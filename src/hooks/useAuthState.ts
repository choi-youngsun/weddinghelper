import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchAuthStatus = async () => {
  const response = await axios.get('/api/auth/check', {
    withCredentials: true,
  });
  return response.data;
};

export function useAuthStatus() {
  return useQuery({
    queryKey: ['authStatus'],
    queryFn: fetchAuthStatus,
    retry: false, // 인증 실패 시 재시도 안 함
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱
  });
}
