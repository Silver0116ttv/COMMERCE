import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import {Customer} from './index.js';
import basicAuth from 'express-basic-auth';
import crypto from 'crypto';

const app = express();
const port = 4000;

function hash(value) {
    return crypto.createHash('sha256').update(value).digest('hex');
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 app.get('/', (req, res) => {
    res.sendStatus(200);
 })
    
 
app.post('/signup', async (req, res) => {
    const username = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    try {
        const user = await Customer.create({username: username, email: email, password: password});
        res.send(JSON.stringify(user, null, 4));
    } catch (error) {
        console.error('Problem executing signup, error: ', error);
    }

})

app.post('/login', async (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    
    try {
        const user = await Customer.findOne({ where: { username },  });
        if (!user) {
            return false;
        }
        const hashedPassword = hash(username + password);
        if (hashedPassword === user.password) {
            res.status(200).send(JSON.stringify(user, null, 2))
        } else {
            res.send(JSON.stringify('Username or password wrong please try again'))
        }
    } catch (error) {
        console.error('Error verifying el login:', error);
        return false;
    }
    

})

app.get('/allUsers', async (req, res) => {
   try {
        const users = await Customer.findAll({ exclude: ['password'] });
        users.every(user => user instanceof Customer); 
        res.status(200).send(JSON.stringify(users, null, 2));
   } catch (error) {
        console.error('Problem executing getting all users, error: ', error);
   }
})

app.patch('/user/:id', async (req, res) => {
    const id = parseInt(req.params.id);
   const request = req.body;
   try {
    const user = await Customer.findByPk(id);
    console.log(user.name);
    res.send(JSON.stringify(user, null, 4));
   } catch (error) {
    console.error('Problem executing find the user, error: ', error);
   }
})

app.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = Customer.findOne({  where: { authorId: id } });
        await user.destroy();
        res.status(200).send(`${user.id} was removed from the database`)
       } catch (error) {
        console.error('Problem executing finding, error: ', error);
       }

})

app.delete('/item/:id', async (req, res) => {
    const id = req.params.id;
    try { 

       } catch (error) {
        
       }

})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

  

async function verifyLogin(username, password) {
    
}