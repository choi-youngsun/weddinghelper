import mongoose from 'mongoose';
declare global {
  // eslint-disable-next-line no-var
  var mongoose: any; // Next.js official example: Must be `var` due to global scope handling
}

let cached = global.mongoose; //global은 전역 객체

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(retries = 5, delay = 10000) {
  const MONGODB_URI = process.env.MONGODB_URI!;

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    if (retries > 0) {
      console.log(`MongoDB 연결 실패, ${retries}번 더 시도합니다...`);
      // 지연 후 재시도
      await new Promise((resolve) => setTimeout(resolve, delay));
      return dbConnect(retries - 1, delay); // 재시도
    } else {
      cached.promise = null;
      throw new Error('MongoDB 연결에 실패했습니다.', e);
    }
  }

  return cached.conn;
}

export default dbConnect;
