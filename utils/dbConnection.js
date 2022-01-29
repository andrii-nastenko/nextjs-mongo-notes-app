import mongoose from 'mongoose';

export async function dbConnect() {
  return await mongoose.connect(process.env.MONGO_URI);
}
