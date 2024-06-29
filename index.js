import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import {Sequelize, Model, DataTypes} from 'sequelize';
import { Json } from 'sequelize/lib/utils';

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000/";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const sequelize = new Sequelize('name-database', 'postgres', 'contraseña', {
  host: 'localhost',
  dialect: 'postgres',
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

class Product extends Model{};
class Order extends Model {};
class Customer extends Model {};
class Payment extends Model {};
class Cart extends Model {};
class Category extends Model {};

Product.init(
  {
    name:        DataTypes.STRING(45),
    Price:       DataTypes.DECIMAL(10, 2),
    Description: DataTypes.TEXT,
  },
  {
    sequelize,
    tableName:'products',
    createdAt: false,
  },
);

Order.init(
  {
    order_amount: DataTypes.STRING(45),
    order_date:   DataTypes.DATE,
  },
  {
    sequelize,
    tableName:'orders',
  },
);

Customer.init(
  {
    name:     DataTypes.STRING(45),
    email:    DataTypes.STRING(255),
    password: DataTypes.STRING(25),
  },
  {
    sequelize,
    tableName:'customers',
    createdAt: false,
  },
);

Payment.init(
  {
    type:   DataTypes.STRING(50),
    amount: DataTypes.DECIMAL(10, 2),
  },
  {
    sequelize,
    tableName:'payments',
  },
);

Cart.init(
  {
    customer_id: 
    {
      type: DataTypes.INTEGER,
      references: { model: Customer, key: 'id' }
    },
  },
  {
    sequelize,
    tableName:'carts',
    createdAt: false,
  },
);

Category.init (
  {
    name:         DataTypes.STRING(45),
    picture:      DataTypes.STRING(45),
    description:  DataTypes.TEXT,
  },
  {
    sequelize,
    tableName:'categories',
    createdAt: false,
  },
);

//User.sync({force: true}); //crea tabla si no existe y si existe no hace nada
// User.sync({ force: true }); //crea tabla si no existe y si existe borra tabla y cre auna nueva, recrear tabla
// User.sync({ alter: true }); //analiza todos los datos de la tabla y edita lo necesario  para matchear el modelo
//await sequelize.sync({ force: true }) //'All models were synchronized successfully
//await sequelize.drop(); //All tables dropped!


//console.log(sequelize.models);
// `sequelize.define` also returns the model
// console.log(Customer === sequelize.models.User); // true
//const daniel = Customer.build({name:'Daniel Moreno'});

// the name is still "Jane" in the database

//const customers = await Customer.findAll(
  //{
   // attributes: ['name']
  //}
//);
//console.log('All users: ', JSON.stringify(customers, null, 4));
// the name is still "Jane" in the database
//const instrumento = Category.build({name: 'Guitarra', picture:'guitarrafoto', description:'Guitarra negraa'});
//ways to console.log sequelize instances
//console.log(JSON.stringify(instrumento, null, 4));
//console.log(user.toJSON());
//console.log(JSON.stringify(user, null, 4)); //me gusta mas este formato

//TODO
/*investigar mas sobre UUID en base de datos y js
invetigar  mas sobre sequelized
postgresql*/