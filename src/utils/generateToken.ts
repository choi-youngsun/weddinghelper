import jwt from 'jsonwebtoken';

export const generateTokens = (
  userId: string
): { accessToken: string; refreshToken: string } => {
  const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
  const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
  if (!REFRESH_SECRET || !ACCESS_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // 액세스 토큰 발급
  const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET, {
    expiresIn: '1h', // 1시간 만료
  });

  // 리프레시 토큰 발급
  const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET, {
    expiresIn: '7d', // 7일 만료
  });

  // 리프레시 토큰은 데이터베이스에 저장하거나 세션에 저장하여 추후 사용
  // 예시: await saveRefreshTokenToDatabase(userId, refreshToken);

  return {
    accessToken,
    refreshToken,
  };
};
