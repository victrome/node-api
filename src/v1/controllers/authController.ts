import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { generateAccessToken, generateRefreshToken } from '../services/authService';

export class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.authenticateUser(req.body['emailAddress'], req.body['password']);
      const accessToken = generateAccessToken("1");
      const refreshToken = generateRefreshToken("1");
      res.status(200).json({ success: true, data: { accessToken, refreshToken, user} });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  }
  
}
