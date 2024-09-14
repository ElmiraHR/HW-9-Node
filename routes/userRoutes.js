import express from 'express';
import { register, changePassword, deleteAccount, changeEmail } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Маршрут для регистрации пользователя
router.post('/register', register);

// Маршрут для смены пароля
router.post('/change-password', authMiddleware, changePassword);

// Маршрут для удаления аккаунта
router.post('/delete-account', authMiddleware, deleteAccount);

// Маршрут для изменения email
router.post('/change-email', authMiddleware, changeEmail);

export default router;
