import Sequelize from 'sequelize';
import env from 'dotenv';

env.config();

export const sequelize = new Sequelize('e-commerce', 'postgres', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    define: { 
      updatedAt: false
     }
  });