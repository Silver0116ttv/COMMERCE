import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import pg from 'pg';
import {Sequelize} from 'sequelize';


const app = express();
const port = 4000;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sequelize = new Sequelize('e-commerce', 'postgres', 'Destripador123.', {
    host: 'localhost',
    dialect: 'postgres', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    define: { 
      freezeTableName: true,
      updatedAt: false
     }
  });
  
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  };

 app.get('/', (req, res) => {
    res.sendStatus(200);
 })
        
app.post('/signup', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    try {
        const user = await sequelize.create()
    } catch (error) {
        console.error('Problem executing signup, error: ', error);
    }

})

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const result = await client.query('SELECT * FROM public.customers WHERE email=$1 AND password =$2;',[email ,password]);
        res.json(result.rows);
    } catch (error) {
        console.error('Problem executing login, error: ', error);
    }
})

app.get('/user', async (req, res) => {
   

})

app.patch('/user/:userId', async (req, res) => {
   const userId = req.params.userId;
   const request = req.body;
})

app.delete('/user/:userId', async (req, res) => {
   

})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})