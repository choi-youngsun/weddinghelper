import { NextApiResponse } from 'next';
import { ExtendedNextApiRequest } from '@/api/authenticate';
import authenticate from '@/api/authenticate';
import OrderNumber from '@/db/models/orderNumber';
import GroomGuest, { IGroomGuest } from '@/db/models/groomGuest';
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
  data?: IGroomGuest[];
  createdAt?: string;
  updatedAt?: string;
};

export default authenticate(async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const { side, guestName, affiliation, giftAmount, ticketCount, note } =
      req.body;

    const userId = req.user.id; // 인증된 사용자 정보를 req.user에서 가져옴

    try {
      const existingGuest = await GroomGuest.findOne({
        userId,
        guestName,
        affiliation,
      });
      if (existingGuest) {
        return res.status(400).send({
          success: false,
          message: '이미 등록된 하객 정보입니다.',
        });
      }

      // 새로운 하객 등록 로직

      // 해당 userId와 side의 마지막 orderNumber 가져오기
      let orderEntry = await OrderNumber.findOne({ userId, side });
      // 초기 값 설정
      if (!orderEntry) {
        orderEntry = new OrderNumber({ userId, side, lastOrderNumber: 0 });
      }

      // 새로운 하객의 orderNumber 설정
      const newOrderNumber = orderEntry.lastOrderNumber + 1;

      const newGuest = await GroomGuest.create({
        userId,
        orderNumber: newOrderNumber,
        side,
        guestName,
        affiliation,
        giftAmount,
        ticketCount,
        note,
      });

      // 새로운 orderNumber를 OrderNumber 모델에 저장
      orderEntry.lastOrderNumber = newOrderNumber;
      await orderEntry.save();
      await newGuest.save();
      // 사용자 조회
      const user = await UserData.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found' });
      }
      user.groomGuests = user.groomGuests || [];
      user.groomGuests.push(newGuest);

      // 업데이트된 사용자 저장
      await user.save();

      res.status(200).json({
        success: true,
        message: '하객 등록 성공!',
        guest: newGuest,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: `Server error: ${error}` });
    }
  } else if (req.method === 'GET') {
    const userId = req.user.id;

    try {
      const guests = await GroomGuest.find({ userId });
      res.status(200).json({
        success: true,
        message: '조회 성공!',
        data: guests,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
});
