import UserData from '@/db/models/user';
import { NextApiResponse } from 'next';
import { ExtendedNextApiRequest } from '@/api/authenticate';
import authenticate from '@/api/authenticate';

export default authenticate(async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const { side, affiliation, action } = req.body; // action, side, affiliation 정보 받음
    console.log(req.user);
    const userId = req.user.id; // 인증된 사용자 정보를 req.user에서 가져옴

    try {
      const user = await UserData.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      let updateQuery = {};
      let errorMessage = '';

      if (action === 'add') {
        // 소속 추가
        if (side === 'brideSide' && !user.brideSide.includes(affiliation)) {
          updateQuery = { $addToSet: { brideSide: affiliation } }; // 중복 방지 추가
        } else if (
          side === 'groomSide' &&
          !user.groomSide.includes(affiliation)
        ) {
          updateQuery = { $addToSet: { groomSide: affiliation } }; // 중복 방지 추가
        } else {
          errorMessage = '이미 추가된 소속입니다.';
        }
      } else if (action === 'remove') {
        // 소속 삭제
        if (side === 'brideSide') {
          updateQuery = { $pull: { brideSide: affiliation } };
        } else if (side === 'groomSide') {
          updateQuery = { $pull: { groomSide: affiliation } };
        }
      }

      if (errorMessage) {
        return res.status(400).json({ message: errorMessage });
      }

      // 해당 유저 업데이트
      const updatedUser = await UserData.findOneAndUpdate(
        { _id: userId },
        updateQuery,
        { new: true }
      ).select('name email brideSide groomSide'); // 업데이트된 사용자 정보에서 비밀번호 제외;

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        message: `Affiliation ${action}ed successfully`,
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'GET') {
    const userId = req.user.id;

    try {
      const user = await UserData.findOne({ _id: userId }).select(
        'name email brideSide groomSide'
      ); // 사용자 정보 조회 (비밀번호 제외)   .select('name email brideSide groomSide');
      res.status(200).json({
        message: '조회 성공!',
        user: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
});
