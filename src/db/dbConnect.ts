import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongoose:
    | {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      }
    | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// 글로벌 캐시 객체 설정
globalThis.mongoose ??= { conn: null, promise: null }; // undefined 방지
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function dbConnect(retries = 5, delay = 10000) {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection; // 기존 코드에서 mongoose 전체를 반환하던 것 수정
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`MongoDB 연결 실패: ${e.message}`);
    } else {
      console.error('MongoDB 연결 실패: 알 수 없는 오류', e);
    }

    if (retries > 0) {
      console.log(`MongoDB 연결 실패, ${retries}번 더 시도합니다...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return dbConnect(retries - 1, delay);
    } else {
      cached.promise = null;
      throw new Error(
        `MongoDB 연결에 실패했습니다: ${e instanceof Error ? e.message : String(e)}`
      );
    }
  }

  return cached.conn;
}

export default dbConnect;
