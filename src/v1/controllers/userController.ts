import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { generateAccessToken, generateRefreshToken } from '../services/authService';

export class UserController {
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById('');
      const accessToken = generateAccessToken("1");
      const refreshToken = generateRefreshToken("1");
      res.status(200).json({ success: true, data: { accessToken, refreshToken} });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  }
  public static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getUsers();
      res.status(200).json({ success: true, data: users });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  }

  public static async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  }

  public static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  }

  public static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  }

  public static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  }
}
