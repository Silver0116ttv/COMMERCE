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
    database: 'world',
  });
  
  client
  .connect()
  .then(() => {
      console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
      console.error('Error connecting to PostgreSQL database', err);
  });

 
        
app.get('/signup', async (req, res) => {
    try {
        const result =  await client.query('SELECT * FROM public.capitals ORDER BY id ASC')
        res.json(result.rows)
    } catch (error) {
        console.error('Problem executing select all, error: ', error)
    }

})

app.post('/login', async (req, res) => {
 

})

app.get('/user', async (req, res) => {
   

})

app.patch('/user/:id', async (req, res) => {
   

})

app.delete('/user/:userId', async (req, res) => {
   

})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})