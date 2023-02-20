import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, generateAccessToken, verifyRefreshToken, generateRefreshToken } from './../services/authService';

interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Get the JWT token from the request header
  const accessToken = req.headers['x-access-token'] as string;
  const refreshToken = req.headers['x-refresh-token'] as string;
  if (!refreshToken && !accessToken) {
    return res.status(400).json({ error: 'Token not provided' });
  }

  try {
    // Verify the JWT token using the secret
    const decodedAccessToken = verifyAccessToken(accessToken) as { userId: string };
    const decodedRefreshToken = verifyRefreshToken(refreshToken) as { userId: string };
    const userId = decodedAccessToken.userId;
    console.log(decodedAccessToken, decodedRefreshToken);
    // Attach the user ID to the request object for use in downstream handlers
    //req.userId = userId;
    // Set new tokens in response headers
    res.set('x-access-token', accessToken);
    res.set('x-refresh-token', refreshToken);

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
};

// Middleware to check for the presence and validity of the access token
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.sendStatus(401);
  }

  const decoded = verifyAccessToken(accessToken);

  if (!decoded) {
    return res.sendStatus(401);
  }

  req.body.userId = decoded.userId;
  next();
};

// Middleware to refresh the access token using the refresh token
const refreshAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.sendStatus(401);
  }

  const decoded = verifyAccessToken(accessToken);

  if (!decoded) {
    return res.sendStatus(401);
  }

  const userId = decoded.userId;
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  const refreshDecoded = verifyRefreshToken(refreshToken);

  if (!refreshDecoded || refreshDecoded.userId !== userId) {
    return res.sendStatus(401);
  }

  const newAccessToken = generateAccessToken(userId);
  const newRefreshToken = generateRefreshToken(userId);

  // Update the refresh token in the database

  res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
};