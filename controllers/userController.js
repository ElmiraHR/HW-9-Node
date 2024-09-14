import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Контроллер для регистрации пользователя
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверка уникальности email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email уже зарегистрирован' });
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};

// Контроллер для смены пароля
export const changePassword = async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.user.id; // Предполагается, что пользователь авторизован

  try {
    // Хэширование нового пароля
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Обновление пароля и сброс флага mustChangePassword
    await User.update(
      { password: hashedPassword, mustChangePassword: false },
      { where: { id: userId } }
    );

    res.status(200).json({ message: 'Пароль успешно обновлён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};

// Контроллер для удаления аккаунта
export const deleteAccount = async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id; // Предполагается, что пользователь авторизован

  try {
    const user = await User.findOne({ where: { id: userId } });

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    // Удаление аккаунта
    await User.destroy({ where: { id: userId } });

    res.status(200).json({ message: 'Аккаунт успешно удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};

// Контроллер для изменения email
export const changeEmail = async (req, res) => {
  const { newEmail, password } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findOne({ where: { id: userId } });

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    // Проверка, существует ли новый email
    const emailExists = await User.findOne({ where: { email: newEmail } });
    if (emailExists) {
      return res.status(400).json({ message: 'Email уже зарегистрирован' });
    }

    // Обновление email
    await User.update({ email: newEmail }, { where: { id: userId } });

    res.status(200).json({ message: 'Email успешно обновлён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};
