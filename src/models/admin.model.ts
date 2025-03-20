import { Database } from '../database/database.init';
import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import { generateToken } from '../helpers/token.generator';
import Bcrypt from 'bcrypt';
import Mailer from '../helpers/node.mailer';

export const AdminModel = Database.define('admins', {
  id: { type: DataTypes.UUID(), unique: true, primaryKey: true },
  email: { type: DataTypes.STRING(30), unique: true, allowNull: false },
  password: { type: DataTypes.STRING(72) },
  full_name: { type: DataTypes.STRING(40) },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  secret: { type: DataTypes.STRING, defaultValue: null },
});

AdminModel.beforeCreate(async (user: any) => {
  if (!user.id) user.id = uuid();
  user.secret = uuid();
  if (user.password)
    user.password = await Bcrypt.hash(user.password, 10);
  else user.password = 'waiting-response';
  await Mailer.activation(
    user.email,
    generateToken('24h', {
      id: user.id,
      secret: user.secret,
      email: user.email,
      role: user.role,
    }) as any,
    user.fullName);
});