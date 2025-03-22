import { Database } from '../database/database.init';
import { DataTypes } from 'sequelize';

export const ReviewModel = Database.define('reviews', {
  id: { type: DataTypes.UUID(), unique: true, primaryKey: true },
  profession: { type: DataTypes.STRING, allowNull: false },
  review: { type: DataTypes.STRING },
  full_name: { type: DataTypes.STRING(40) },
});