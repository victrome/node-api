import dotenv from 'dotenv';

dotenv.config(); 

interface AppConfig {
    port: number;
    accessSecretToken: string;
    accessSecretTokenExpire: string;
    refreshSecretToken: string;
    refreshSecretTokenExpire: string;
  }
  export const appConfig: AppConfig = {
    port: parseInt(process.env.SERVER_PORT || '3000', 10),
    accessSecretToken: process.env.ACCESS_SECRET_KEY || 'H6G78GjKoub)875h*&Hbgt',
    accessSecretTokenExpire: process.env.ACCESS_SECRET_KEY_EXPIRE || '30m',
    refreshSecretToken: process.env.REFRESH_SECRET_KEY || 'Khgbuut775&*^TT3VHYg4Y&5fG',
    refreshSecretTokenExpire: process.env.REFRESH_SECRET_KEY_EXPIRE || '5d',
  };