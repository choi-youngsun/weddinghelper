import mongoose from 'mongoose';

interface ILoginRequest {
  userId: string; // 아이디 (예: 이메일)
  password: string; // 비밀번호
}

const loginRequestSchema = new mongoose.Schema<ILoginRequest>({
  userId: { type: String, required: true }, // 필수
  password: { type: String, required: true }, // 필수
});

const LoginRequest = mongoose.model<ILoginRequest>(
  'LoginRequest',
  loginRequestSchema
);

export default LoginRequest;
