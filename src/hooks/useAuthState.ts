import { fetchAuthStatus } from '@/api/auth/authAPI';
import { useQuery } from '@tanstack/react-query';

export function useAuthStatus() {
  return useQuery({
    queryKey: ['authStatus'],
    queryFn: fetchAuthStatus,
    retry: false, // 인증 실패 시 재시도 안 함
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱
  });
}
