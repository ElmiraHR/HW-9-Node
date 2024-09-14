import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mustChangePassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};
