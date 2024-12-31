import mongoose from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true }, // 필수
  password: { type: String, required: true }, // 필수
  passwordCheck: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
