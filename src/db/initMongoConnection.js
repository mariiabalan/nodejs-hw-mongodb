import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const initMongoConnection = async () => {
  const MONGODB_USER = process.env.MONGODB_USER;
  const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
  const MONGODB_URL = process.env.MONGODB_URL;
  const MONGODB_DB = process.env.MONGODB_DB;

  if (!MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_URL || !MONGODB_DB) {
    throw new Error(
      'MongoDB credentials are not properly defined in the .env file.',
    );
  }

  const mongoUri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};
