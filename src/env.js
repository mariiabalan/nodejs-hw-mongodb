import dotenv from 'dotenv';
dotenv.config();

export const env = (key, defaultValue = '') => {
  const value = process.env[key] || defaultValue;
  if (!process.env[key] && !defaultValue) {
    console.warn(`Warning: Environment variable ${key} is not defined!`);
  }
  return value;
};
