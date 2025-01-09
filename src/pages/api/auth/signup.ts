import dbConnect from '@/db/dbConnect';
import UserData from '@/db/models/user';
import { hashPassword } from '@/utils/hashPassword';
import type { NextApiRequest, NextApiResponse } from 'next';

// 응답 타입 정의
type ResponseData = {
  success: boolean;
  message: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    password?: string;
    passwordCheck?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      try {
        const existingUser = await UserData.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).send({
            success: false,
            message: '이미 등록된 이메일입니다.',
          });
        } else {
          const hashedPassword = await hashPassword(req.body.password);
          const hashedPasswordCheck = await hashPassword(
            req.body.passwordCheck
          );
          req.body.password = hashedPassword;
          req.body.passwordCheck = hashedPasswordCheck;
          const newUser = await UserData.create(req.body);

          res.status(201).send({
            success: true,
            message: '회원가입 성공!',
            user: {
              _id: String(newUser._id),
              name: newUser.name,
              email: newUser.email,
            },
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
          });
        }
      } catch (error: any) {
        res.status(500).send({
          success: false,
          message: `회원가입 실패: ${error.message}`,
        });
      }
      break;
    default:
      res.status(405).send({
        success: false,
        message: '허용되지 않는 메서드입니다.',
      });
      break;
  }
}
