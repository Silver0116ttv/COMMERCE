import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import Sequelize from 'sequelize';

const app = express();
const port = 4000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const client = new pg.Client({
    user: 'postgres',
    password: 'Destripador123.',
    host: 'localhost',
    port: 5432,
    database: 'e-commerce',
  });
  
  client
  .connect()
  .then(() => {
      console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
      console.error('Error connecting to PostgreSQL database', err);
  });

 app.get('/', (req, res) => {
    res.sendStatus(200);
 })
        
app.post('/signup', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    try {
        const result = await client.query('INSERT INTO  public.customers(name, email, password) VALUES ($1,$2,$3) RETURNING *;',[name, email ,password]);
        res.json(result.rows);
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