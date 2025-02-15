import mongoose from 'mongoose';
import { brideGuestSchema, IBrideGuest } from './brideGuest';
import { groomGuestSchema, IGroomGuest } from './groomGuest';

interface IUser {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  brideSide: string[];
  groomSide: string[];
  brideGuests: IBrideGuest[];
  groomGuests: IGroomGuest[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    name: { type: String, required: true },
    email: { type: String, required: true }, // 필수
    password: { type: String, required: true }, // 필수
    brideSide: { type: [String], default: [] }, // 신부측 소속 정보
    groomSide: { type: [String], default: [] }, // 신랑측 소속 정보
    brideGuests: { type: [brideGuestSchema], default: [] },
    groomGuests: { type: [groomGuestSchema], default: [] },
  },
  { timestamps: true }
);

const UserData =
  mongoose.models.UserData || mongoose.model<IUser>('UserData', userSchema);

export default UserData;
