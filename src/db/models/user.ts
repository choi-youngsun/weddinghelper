import mongoose from 'mongoose';

interface IUser {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  brideSide: string[];
  groomSide: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true }, // 필수
    password: { type: String, required: true }, // 필수
    brideSide: { type: [String], default: [] }, // 신부측 소속 정보
    groomSide: { type: [String], default: [] }, // 신랑측 소속 정보
  },
  { timestamps: true }
);

const UserData =
  mongoose.models.UserData || mongoose.model<IUser>('UserData', userSchema);

export default UserData;
