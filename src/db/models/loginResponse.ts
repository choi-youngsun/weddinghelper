import mongoose, { Document } from 'mongoose';

interface ILoginResponse extends Document {
  success: boolean; // 로그인 성공 여부
  message: string; // 로그인 성공 메시지
  token: string; // JWT 토큰
  user?: {
    id: string; // 사용자 ID
    email: string; // 사용자 이메일
  };
}

const loginResponseSchema = new mongoose.Schema({
  success: { type: Boolean, required: true },
  message: { type: String, required: true },
  token: { type: String, required: true },
  user: {
    id: { type: String },
    email: { type: String },
  },
});

const LoginResponse = mongoose.model<ILoginResponse>(
  'LoginResponse',
  loginResponseSchema
);

export default LoginResponse;
