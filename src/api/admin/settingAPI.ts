import axiosInstance from '../axiosInstance';

export const getUserSetting = async (side?: string) => {
  const response = await axiosInstance.get('users/setting', {
    params: side ? { side } : undefined,
  });
  return response.data;
};

export const patchUserSetting = async (
  side: string,
  affiliation: string,
  action: string
) => {
  const response = await axiosInstance.patch('users/setting', {
    side,
    affiliation,
    action,
  });
  return response.data;
};
