import dbConnect from '@/db/dbConnect';
import UserData from '@/db/models/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { generateTokens } from '@/utils/generateToken';
import * as cookie from 'cookie';

// 응답 타입 정의
type ResponseData = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
  };
  accessToken?: string; // 액세스 토큰 포함
  refreshToken?: string; // 리프레시 토큰 포함
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await dbConnect();
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await UserData.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: '이메일 또는 비밀번호를 확인해주세요.',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: '이메일 또는 비밀번호를 확인해주세요.',
      });
    }

    // JWT 토큰 발급
    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    if (!accessToken || !refreshToken) {
      throw new Error('Token generation failed');
    }
    // 쿠키에 토큰 설정
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // 클라이언트 URL
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    const accessTokenCookie = cookie.serialize('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1시간 만료
      path: '/', // 모든 경로에서 접근 가능
      sameSite: 'strict',
    });

    const refreshTokenCookie = cookie.serialize('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30일 만료
      path: '/', // 모든 경로에서 접근 가능
      sameSite: 'strict',
    });

    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error : ${error.message}`,
    });
  }
}
