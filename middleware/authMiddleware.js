import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Нет токена, авторизация запрещена' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Используй свой секретный ключ
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Неверный токен' });
  }
};
