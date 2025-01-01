import dbConnect from '@/db/dbConnect';
import User from '@/db/models/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const users = await User.find();
        res.send(users);
      } catch (error: any) {
        res.send({ success: false, message: `조회 실패: ${error.message}` });
      }
      break;

    default:
      res.status(404).send('에러');
  }
}
