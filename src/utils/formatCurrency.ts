export const formatCurrency = (amount: number | null): string => {
  return new Intl.NumberFormat('ko-KR').format(amount ?? 0); // currency 없이, 숫자만 포맷
};
