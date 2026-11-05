import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI?.trim() || '';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase() {
  // If no URI is provided, gracefully return null without throwing build-time errors
  if (!MONGODB_URI) {
    return null;
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.warn('[MongoDB] Connection failed, falling back to local mode:', error);
    return null;
  }
}