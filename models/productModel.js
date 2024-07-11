import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';


export class Product extends Model{};

Product.init(
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      Description: DataTypes.TEXT,
      Price: DataTypes.DECIMAL(10, 2),
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Category, 
          key:'id',
        },
      },
      
    },
    {
      sequelize,
      createdAt: false,
      tableName:'products'
    },
  );