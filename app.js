import express from 'express';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/db.js';

const app = express();

app.use(express.json());

// Подключение маршрутов
app.use('/users', userRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Синхронизация базы данных
sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Error syncing database:', err);
});
