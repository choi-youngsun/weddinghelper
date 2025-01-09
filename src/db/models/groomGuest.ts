import mongoose from 'mongoose';

// 타입 정의 (TypeScript용)
export interface IGroomGuest extends Document {
  userId: mongoose.Schema.Types.ObjectId; // 사용자 ID
  orderNumber: number; // 정렬 번호
  side: string; // 신부측, 신랑측 등
  guestName: string; // 손님 이름
  affiliation: string; // 그룹 (가족, 직장 등)
  giftAmount?: number; // 축의금 금액 (optional)
  ticketCount?: number; // 식권 수 (optional)
  note?: string; // 비고 (optional)
  createdAt?: Date;
  updatedAt?: Date;
}

const groomGuestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderNumber: { type: Number, required: true }, // 필수
    side: { type: String, required: true, enum: ['bride', 'groom'] }, // 필수, 선택값 제한
    guestName: { type: String, required: true }, // 필수
    affiliation: { type: String, required: true }, // 필수
    giftAmount: { type: Number, default: null }, // 선택
    ticketCount: { type: Number, default: null }, // 선택
    note: { type: String, default: '' }, // 선택, 기본값은 빈 문자열
  },
  { timestamps: true }
);

// Mongoose 모델 생성
const GroomGuest =
  mongoose.models['GroomGuest'] ||
  mongoose.model<IGroomGuest>('GroomGuest', groomGuestSchema);

export default GroomGuest;
