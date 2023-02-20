import express from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

//Anonymous Requests
router.get('/', UserController.getUsers);
router.post('/login', UserController.login);
router.get('/:id', UserController.getUser);

//Autheticated Requests
router.use('/', authMiddleware);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
