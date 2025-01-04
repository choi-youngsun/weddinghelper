import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

interface TokenPayload {
  userId: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 쿠키에서 refreshToken 추출
  console.log('req.cookies:', req.cookies);
  const refreshToken = req.cookies.refreshToken;
  console.log('refreshToken:', refreshToken);

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    if (!REFRESH_SECRET || !ACCESS_SECRET) {
      return res.status(500).json({ message: 'Missing JWT secret key' });
    }
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as TokenPayload;

    console.log('decoded:', decoded);

    // JWT 토큰 발급
    const newAccessToken = jwt.sign({ userId: decoded.userId }, ACCESS_SECRET, {
      expiresIn: '1h', // 1시간 만료
    });

    const newRefreshToken = jwt.sign(
      { userId: decoded.userId },
      REFRESH_SECRET,
      {
        expiresIn: '7d', // 7일 만료
      }
    );

    const accessTokenCookie = cookie.serialize('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1시간 만료
      path: '/', // 모든 경로에서 접근 가능
      sameSite: 'strict',
    });

    const refreshTokenCookie = cookie.serialize(
      'refreshToken',
      newRefreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60, // 30일 만료
        path: '/', // 모든 경로에서 접근 가능
        sameSite: 'strict',
      }
    );
    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return res.status(200).json({ message: '새로운 토큰 발급 성공!' });
  } catch (error: any) {
    return res
      .status(401)
      .json({ message: `Invalid refresh token: ${error.message}` });
  }
}
