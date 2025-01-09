import { NextApiRequest, NextApiResponse } from 'next';
import * as cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // accessToken, refreshToken 쿠키를 만료시킴
    res.setHeader('Set-Cookie', [
      cookie.serialize('accessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0, // 쿠키를 즉시 만료시킴
        path: '/',
        sameSite: 'strict',
      }),
      cookie.serialize('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0, // 쿠키를 즉시 만료시킴
        path: '/',
        sameSite: 'strict',
      }),
    ]);

    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
