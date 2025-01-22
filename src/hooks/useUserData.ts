import { getUserSetting } from '@/api/admin/settingAPI';
import { useQuery } from '@tanstack/react-query';

export const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUserSetting(),
  });
};

export const useUserAffiliationData = () => {
  return useQuery({
    queryKey: ['user', 'affiliation'],
    queryFn: () => getUserSetting(['bride', 'groom']),
  });
};

export const useBrideGuestData = () => {
  return useQuery({
    queryKey: ['brideGuest'],
    queryFn: () => getUserSetting(['brideGuests']),
  });
};

export const useGroomGuestData = () => {
  return useQuery({
    queryKey: ['groomGuest'],
    queryFn: () => getUserSetting(['groomGuests']),
  });
};
