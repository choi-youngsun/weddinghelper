import { getUserSetting } from '@/api/admin/settingAPI';
import { useQuery } from '@tanstack/react-query';

export const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUserSetting(['name']),
  });
};

export const useUserAffiliationData = (isLoggedIn: boolean) => {
  return useQuery({
    queryKey: ['user', 'affiliation'],
    queryFn: () => getUserSetting(['bride', 'groom']),
    enabled: isLoggedIn, // 로그인된 경우에만 실행
  });
};

export const useBrideGuestData = (isEditing: boolean, isLoggedIn: boolean) => {
  return useQuery({
    queryKey: ['brideGuest'],
    queryFn: () => getUserSetting(['brideGuests']),
    refetchInterval: isEditing ? false : 7000,
    enabled: isLoggedIn, // 로그인된 경우에만 실행
    retry: 2, // 최대 재시도 횟수 설정
  });
};

export const useGroomGuestData = (isEditing: boolean, isLoggedIn: boolean) => {
  return useQuery({
    queryKey: ['groomGuest'],
    queryFn: () => getUserSetting(['groomGuests']),
    refetchInterval: isEditing ? false : 7000,
    enabled: isLoggedIn, // 로그인된 경우에만 실행
  });
};
