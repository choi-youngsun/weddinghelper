import dbConnect from '@/db/dbConnect';
import User from '@/db/models/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findById(id);
        res.send({ success: false, message: '조회 성공!', user });
      } catch (error: any) {
        res.send({ success: false, message: `조회 실패: ${error.message}` });
      }
      break;

    case 'PATCH':
      try {
        const { name, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { $set: { name, email, password } }, // 수정할 필드
          { new: true }
        );
        res
          .status(200)
          .send({ success: true, message: '수정 성공!', user: updatedUser });
      } catch (error: any) {
        res.send({ success: false, message: `수정 실패: ${error.message}` });
      }
      break;

    case 'DELETE':
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.send({ success: true, message: '삭제 성공!', user: deletedUser });
      } catch (error: any) {
        res.send({ success: false, message: `삭제 실패: ${error.message}` });
      }
      break;
  }
}
