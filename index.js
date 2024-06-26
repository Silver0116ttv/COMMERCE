import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import Sequelize from 'sequelize';

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000/";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const client = new Sequelize('database', 'postgres', 'password.', {
    host: 'localhost',
    dialect: 'postgres' /* one of 'mysql' |  | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  try {
    await client.authenticate();
    console.log('Connection has been established successfully.');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  client.close();

  
  // `sequelize.define` also returns the model
  console.log(User === client.models.User); // true