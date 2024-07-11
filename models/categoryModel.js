import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';


export class Category extends Model {};

Category.init (
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull:false
      }
    },
    {
      sequelize,
      createdAt: false,
      tableName:'categories'
    },
  );