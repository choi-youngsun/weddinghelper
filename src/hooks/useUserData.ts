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

export const useBrideGuestData = (isEditing: boolean) => {
  return useQuery({
    queryKey: ['brideGuest'],
    queryFn: () => getUserSetting(['brideGuests']),
    refetchInterval: isEditing ? false : 7000,
  });
};

export const useGroomGuestData = (isEditing: boolean) => {
  return useQuery({
    queryKey: ['groomGuest'],
    queryFn: () => getUserSetting(['groomGuests']),
    refetchInterval: isEditing ? false : 7000,
  });
};
