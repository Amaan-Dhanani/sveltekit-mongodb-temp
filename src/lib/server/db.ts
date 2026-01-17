import { SECRET_MONGODB_URI } from "$env/static/private";
import mongoose from "mongoose";

let cached = globalThis as any;

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

export async function connect_to_db() {
  if (cached.mongoose.conn) {
    return cached.mongoose.conn;
  }

  if (!cached.mongoose.promise) {
    cached.mongoose.promise = mongoose.connect(SECRET_MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.mongoose.conn = await cached.mongoose.promise;
  return cached.mongoose.conn;
}
