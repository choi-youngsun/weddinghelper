import { getUserSetting } from '@/api/admin/settingAPI';
import { useQuery } from '@tanstack/react-query';

const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUserSetting(),
  });
};

export default useUserData;
