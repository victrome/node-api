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

// Decode the refresh token
export const decodeRefreshToken = (refreshToken: string): any => {
  return jwt.decode(refreshToken);
};

// Decode the access token
export const decodeAccessToken = (accessToken: string): any => {
  return jwt.decode(accessToken);
};

// Verify the refresh token
export const verifyUserTokens = (accessToken: string, refreshToken: string): boolean => {
  try {
    const accessDecoded = decodeAccessToken(accessToken);
    const refreshDecoded = decodeRefreshToken(refreshToken);
    return accessDecoded.userId === refreshDecoded.userId;
  } catch (error) {
    return false;
  }
};
