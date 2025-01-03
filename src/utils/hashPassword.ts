import bcrypt from 'bcrypt';

// 비밀번호 해싱 함수
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // 해싱 강도
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// 비밀번호 비교 함수
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
