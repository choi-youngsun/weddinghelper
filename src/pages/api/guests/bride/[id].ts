import BrideGuest from '@/db/models/brideGuest';
import { NextApiResponse } from 'next';
import { ExtendedNextApiRequest } from '@/api/authenticate';
import authenticate from '@/api/authenticate';
import UserData from '@/db/models/user';

type ResponseData = {
  success: boolean;
  message: string;
  guest?: {
    _id: string;
    orderNumber?: number;
    side: string;
    guestName: string;
    affiliation: string;
    ticketCount: number;
    note: string;
  };
};

export default authenticate(async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query; // URL의 [id] 값
  const userId = req.user.id; // 인증된 사용자 정보를 req.user에서 가져옴

  if (req.method === 'PATCH') {
    const { guestName, affiliation, giftAmount, ticketCount, note } = req.body;

    try {
      // 1. BrideGuest 데이터 수정
      const guest = await BrideGuest.findOne({ _id: id });

      if (!guest) {
        return res
          .status(404)
          .json({ success: false, message: 'Guest not found' });
      }

      // 필드 업데이트
      if (guestName !== undefined) guest.guestName = guestName;
      if (affiliation !== undefined) guest.affiliation = affiliation;
      if (giftAmount !== undefined) guest.giftAmount = giftAmount;
      if (ticketCount !== undefined) guest.ticketCount = ticketCount;
      if (note !== undefined) guest.note = note;

      await guest.save();

      const user = await UserData.findOneAndUpdate(
        { _id: userId, 'brideGuests._id': id }, // 배열의 특정 객체를 찾는 조건
        {
          $set: {
            'brideGuests.$.guestName': guestName,
            'brideGuests.$.affiliation': affiliation,
            'brideGuests.$.giftAmount': giftAmount,
            'brideGuests.$.ticketCount': ticketCount,
            'brideGuests.$.note': note,
          },
        },
        { new: true } // 업데이트 후 수정된 문서를 반환
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found or Guest not in brideGuests',
        });
      }
      res.status(200).json({
        success: true,
        message: '하객 정보 수정 성공!',
        guest,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: `Server error: ${error}` });
    }
  } else if (req.method === 'DELETE') {
    try {
      const guest = await BrideGuest.findByIdAndDelete({ _id: id });
      const user = await UserData.findOne({ _id: userId });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: '유저를 찾을 수 없습니다.' });
      }

      // brideGuests 배열에서 _id가 일치하는 객체 삭제
      const updatedUser = await UserData.findByIdAndUpdate(
        userId,
        { $pull: { brideGuests: { _id: id } } }, // 조건 설정
        { new: true } // 업데이트된 문서 반환
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: '삭제할 하객 정보가 없습니다.' });
      }

      res.status(200).json({
        success: true,
        message: '하객 정보 삭제 성공!',
        guest,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: `Server error: ${error}` });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
});
