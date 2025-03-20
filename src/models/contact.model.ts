import { Database } from '../database/database.init';
import { DataTypes } from 'sequelize';

export const ContactModel = Database.define('contact', {
  id: { type: DataTypes.UUID(), unique: true, primaryKey: true },
  email: { type: DataTypes.STRING(30), unique: true, allowNull: false },
  message: { type: DataTypes.STRING },
  full_name: { type: DataTypes.STRING(40) },
});