import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export class User extends Model {};

User.init(
  {
    username:     {
      type: DataTypes.STRING(45),
      unique: true
    },
    email:    {
      type: DataTypes.STRING(255),
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      set(value) {
      // Using the username as a salt
        this.setDataValue('password', hash(this.username + value));
      }
    },
  },
  {
    sequelize,
    tableName:'customers',
  },
);
