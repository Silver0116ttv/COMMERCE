import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import {Sequelize, Model, DataTypes} from 'sequelize';

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000/";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const sequelize = new Sequelize('database', 'postgres', '123456.', {
  host: 'localhost',
  dialect: 'postgres',
  define: { freezeTableName: true }
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
    tableName:'product',
  },
);

Order.init(
  {
    order_amount: DataTypes.STRING(45),
    order_date:   DataTypes.DATE,
  },
  {
    sequelize,
    tableName:'order',
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
    tableName:'customer',
  },
);

Payment.init(
  {
    type:   DataTypes.STRING(50),
    amount: DataTypes.DECIMAL(10, 2),
  },
  {
    sequelize,
    tableName:'payment',
  },
);

Cart.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: Customer, key: 'user_id' }
    },
  },
  {
    sequelize,
    tableName:'cart',
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
    tableName:'cart',
  },
);

//User.sync({force: true}); //crea tabla si no existe y si existe no hace nada
// User.sync({ force: true }); //crea tabla si no existe y si existe borra tabla y cre auna nueva, recrear tabla
// User.sync({ alter: true }); //analiza todos los datos de la tabla y edita lo necesario  para matchear el modelo
// await sequelize.sync() //'All models were synchronized successfully
// await sequelize.drop(); //All tables dropped!


console.log(sequelize.models);
// `sequelize.define` also returns the model
console.log(Customer === sequelize.models.User); // true
const user = Customer.build({ name: 'Daniel Moreno', email:'daniel.moreno99@gmail.com' });
//console.log(user.toJSON());
console.log(JSON.stringify(user, null, 4)); //me gusta mas este formato

//TODO
/*investigar mas sobre UUID en base de datos y js
invetigar  mas sobre sequelized
postgresql*/