import dbConnect from '@/db/dbConnect';
import Guest from '@/db/models/guest';
import type { NextApiRequest, NextApiResponse } from 'next';

// 응답 타입 정의
type ResponseData = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
  };
  data?: any;
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const props = Object.keys(Guest.schema.paths); // 스키마의 필드 이름을 가져옵니다.
        console.log(props);
        res
          .status(200)
          .send({ success: true, message: '받아오기 성공!', data: props });
      } catch (error) {
        res.status(500).send({ success: false, message: `${error}` });
      }
      break;
    case 'POST':
      res.status(201).send(req.body);
      break;
    case 'DELETE':
      res.send({ success: true, message: '삭제 성공!' });
      break;
    case 'PATCH':
      res.send({ success: true, message: '수정 성공!' });
      break;
  }
}
