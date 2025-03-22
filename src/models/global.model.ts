import { Database } from '../database/database.init';
import { DataTypes } from 'sequelize';

export const GlobalModel = Database.define('globals', {
  id: { type: DataTypes.UUID(), unique: true, primaryKey: true },
  name: { type: DataTypes.ENUM('workers', 'clients', 'com_projects', 'run_projects'), allowNull: false },
  value: { type: DataTypes.BOOLEAN, allowNull: true },
  count: { type: DataTypes.INTEGER, allowNull: true },
});