import { User } from '../../config/xata';
import { appConfig } from '../../config/config';
import jwt from 'jsonwebtoken';

// Generate a new access token
export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, appConfig.accessSecretToken, { expiresIn: appConfig.accessSecretTokenExpire });
};

// Generate a new refresh token
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, appConfig.refreshSecretToken, { expiresIn: appConfig.refreshSecretTokenExpire });
};

// Verify the access token
export const verifyAccessToken = (accessToken: string): any => {
  return jwt.verify(accessToken, appConfig.accessSecretToken);
};

// Verify the refresh token
export const verifyRefreshToken = (refreshToken: string): any => {
  return jwt.verify(refreshToken, appConfig.refreshSecretToken);
};
