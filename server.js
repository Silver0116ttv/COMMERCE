import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import {Customer, Address, Category, Product, Order, Payment, Cart, Products_Cart} from './index.js';

const app = express();
const port = 4000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


 app.get('/', (req, res) => {
    res.sendStatus(200);
 })
        
app.post('/signup', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    try {
        const user = await Customer.create({name: name, email: email, password: password})
        res.send(JSON.stringify(user, null, 4));
    } catch (error) {
        console.error('Problem executing signup, error: ', error);
    }

})

app.post('/login', async (req, res) => {
    
    console.log(req)
    const name = req.body.name;
    const password = req.body.password;
    // try {
    //     const user = Customer.build({name: name, password: password});
    //     await user.reload();
    // } catch (error) {
    //     console.error('Problem executing login, error: ', error);
    // }
})

app.get('/allUsers', async (req, res) => {
   try {
        const users = await Customer.findAll({ exclude: ['password'] });
        users.every(user => user instanceof Customer); 
        res.status(200).send(JSON.stringify(users, null, 2))
   } catch (error) {
        console.error('Problem executing getting all users, error: ', error);
   }
})

app.patch('/user/:id', async (req, res) => {
   const id = req.params.id;
   const request = req.body;
   try {
    const user = await Customer.findByPk(id);
    console.log(user.name);
    res.send(JSON.stringify(user, null, 4));
   } catch (error) {
    console.error('Problem executing find the user, error: ', error);
   }
})

app.delete('/user/:userId', async (req, res) => {
    try {
        const user = Customer.findOne({  where: { authorId: id } });
        await user.destroy();
        res.status(200).send(`${user.id} was removed from the database`)
       } catch (error) {
        console.error('Problem executing finding, error: ', error);
       }

})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})