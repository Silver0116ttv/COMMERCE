import Sequelize from 'sequelize';

export const sequelize = new Sequelize('e-commerce', 'postgres', 'password1234.', {
    host: 'localhost',
    dialect: 'postgres', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    define: { 
      updatedAt: false
     }
  });