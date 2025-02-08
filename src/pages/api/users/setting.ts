import UserData from '@/db/models/user';
import { NextApiResponse } from 'next';
import { ExtendedNextApiRequest } from '@/api/authenticate';
import authenticate from '@/api/authenticate';
import mongoose from 'mongoose';

export default authenticate(async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const { side, affiliation, action } = req.body; // action, side, affiliation 정보 받음

    const userId = new mongoose.Types.ObjectId(String(req.user.id)); // 인증된 사용자 정보를 req.user에서 가져옴

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
    const userId = new mongoose.Types.ObjectId(String(req.user.id));
    const { side } = req.query; // 요청에서 side 값 가져오기

    try {
      // userId로 사용자 데이터 조회
      const user = await UserData.findOne({ _id: userId }).select(
        'name email brideSide groomSide brideGuests groomGuests'
      ); // 사용자 정보 조회 (비밀번호 제외)
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found' });
      }

      let responseData: any = {};

      if (side) {
        const sides = Array.isArray(side) ? side : side.split(','); // 쿼리 파라미터에서 side가 배열인지 확인 후 처리
        // 각 조건에 맞는 데이터 추가
        sides.forEach((s) => {
          if (s === 'bride') {
            responseData.brideSide = user.brideSide;
          } else if (s === 'groom') {
            responseData.groomSide = user.groomSide;
          } else if (s === 'brideGuests') {
            responseData.brideGuests = user.brideGuests;
          } else if (s === 'groomGuests') {
            responseData.groomGuests = user.groomGuests;
          } else if (s === 'name') {
            responseData.name = user.name;
          }
        });
      }

      // 만약 side가 없거나 잘못된 값이면 전체 데이터 반환
      if (!Object.keys(responseData).length) {
        responseData = user;
      }

      // 성공적으로 선택된 데이터 반환
      res.status(200).json({
        success: true,
        message: '조회 성공!',
        user: responseData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
});
