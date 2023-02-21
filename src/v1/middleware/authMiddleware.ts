import { Request, Response, NextFunction } from "express";
import {
  verifyAccessToken,
  generateAccessToken,
  verifyRefreshToken,
  verifyUserTokens,
} from "./../services/authService";

interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the JWT token from the request header
  const accessToken = req.headers["x-access-token"] as string;
  const refreshToken = req.headers["x-refresh-token"] as string;

  // Check if the tokens are provided
  if (!refreshToken || !accessToken) {
    return res.status(400).json({ error: "Token not provided" });
  }
  // Verify the user tokens
  if(!verifyUserTokens(accessToken, refreshToken)) {
    return res.status(401).json({ error: "Invalid authentication token" });
  }
  
  try {
    // Verify the JWT access token
    const decodedAccessToken = verifyAccessToken(accessToken) as {
      userId: string;
    };
    // Get the user ID from the decoded JWT token
    const userId = decodedAccessToken.userId;

    // Set the user ID in the request object
    req['userId'] = userId;

    // Call the next middleware
    next();
  } catch (err) {
    try {
      // Verify the JWT refresh token
      const decodedRefreshToken = verifyRefreshToken(refreshToken) as {
        userId: string;
      };
      const accessToken = generateAccessToken(decodedRefreshToken.userId);
      // Set new access token in response header
      res.set("x-access-token", accessToken);
      next();
    } catch (err) {
      console.log("invalid");
      return res.status(401).json({ message: "Invalid authentication token." });
    }
  }
};
