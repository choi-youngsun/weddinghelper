import axiosInstance from '../axiosInstance';

export interface Guest {
  orderNumber?: number; // 순서
  side?: string; // 신부측, 신랑측
  guestName?: string; // 하객 이름
  affiliation?: string; // 소속 (예: 가족, 친구)
  giftAmount?: number | null; // 축의금 (선택)
  ticketCount?: string | null; // 식권 개수 (선택)
  note?: string; // 메모 (선택)
}

// 신부측 하객 정보를 서버에 전달하는 함수
export const postBrideGuestInfo = async (guest: Guest) => {
  const response = await axiosInstance.post('guests/bride', guest);
  return response.data;
};

// 신랑측 하객 정보를 서버에 전달하는 함수
export const postGroomGuestInfo = async (guest: Guest) => {
  const response = await axiosInstance.post('guests/groom', guest);
  return response.data;
};

// 신부측 하객 정보를 수정하는 함수
export const patchBrideGuestInfo = async (guestId: string, guest: Guest) => {
  const response = await axiosInstance.patch(`guests/bride/${guestId}`, guest);
  return response.data;
};

// 신랑측 하객 정보를 수정하는 함수
export const patchGroomGuestInfo = async (guestId: string, guest: Guest) => {
  const response = await axiosInstance.patch(`guests/groom/${guestId}`, guest);
  return response.data;
};

// 신부측 하객 정보를 수정하는 함수
export const deleteBrideGuestInfo = async (guestId: string) => {
  const response = await axiosInstance.delete(`guests/bride/${guestId}`);
  return response.data;
};

// 신랑측 하객 정보를 수정하는 함수
export const deleteGroomGuestInfo = async (guestId: string) => {
  const response = await axiosInstance.delete(`guests/groom/${guestId}`);
  return response.data;
};
