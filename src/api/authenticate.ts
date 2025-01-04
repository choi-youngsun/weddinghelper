import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export interface ExtendedNextApiRequest extends NextApiRequest {
  user?: any;
}

const authenticate = (
  handler: (req: ExtendedNextApiRequest, res: NextApiResponse) => void
) => {
  return (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.accessToken; // 쿠키에서 accessToken 가져오기

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // JWT 토큰을 디코딩하여 사용자 정보를 추출
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your_secret_key'
      );

      // 디코딩된 사용자 정보를 req.user에 저장
      req.user = decoded;

      // 인증 후 핸들러를 호출
      return handler(req, res); // 인증이 성공하면 핸들러로 넘어감
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Invalid or expired token:', error });
    }
  };
};

export default authenticate;
