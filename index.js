import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import {Sequelize, Model, DataTypes} from 'sequelize';

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000/";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const sequelize = new Sequelize('database', 'postgres', 'password.', {
    host: 'localhost',
    dialect: 'postgres',/* one of 'mysql' |  | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    define: {
      freezeTableName: true, //quita el pluralizar los nombres de las tablas
    }
     
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  };
  
 // using sequelize.define
const User = sequelize.define(
    'User',
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
     tableName:'User'
    },
  );

  // User.sync(); //crea tabla si no existe y si existe no hace nada
  // User.sync({ force: true }); //crea tabla si no existe y si existe borra tabla y cre auna nueva, recrear tabla
  // User.sync({ alter: true }); //analiza todos los datos de la tabla y edita lo necesario  para matchear el modelo
  // await sequelize.sync() //'All models were synchronized successfully
  // await sequelize.drop(); //All tables dropped!


  console.log(sequelize.models);
  // `sequelize.define` also returns the model
  console.log(User === sequelize.models.User); // true

  

