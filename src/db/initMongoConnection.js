import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const password = getEnvVar('MONGODB_PASSWORD');
    const user = getEnvVar('MONGODB_USER');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Successfully conect to database');
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
