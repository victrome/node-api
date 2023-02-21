import express from 'express';
import { AuthController } from '../controllers/authController';

const router = express.Router();

//Anonymous Requests
router.post('/login', AuthController.login);

export default router;
