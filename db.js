import {Sequelize, Model, DataTypes} from 'sequelize';
import crypto from 'crypto';

export const hash = (value) => {
  return crypto.createHash('sha256').update(value).digest('hex');
}

const sequelize = new Sequelize('e-commerce', 'postgres', 'password123.', {
  host: 'localhost',
  dialect: 'postgres', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  define: { 
    updatedAt: false
   }
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  
} catch (error) {
  console.error('Unable to connect to the database:', error);
};

class User extends Model {};
class Address extends Model {};
class Category extends Model {};
class Product extends Model{}; //post
class Order extends Model {};
class Payment extends Model {};
class Cart extends Model {};
class Products_Cart extends Model{};

User.init(
  {
    username:     {
      type: DataTypes.STRING(45),
      unique: true
    },
    email:    {
      type: DataTypes.STRING(255),
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      set(value) {
      // Using the username as a salt
        this.setDataValue('password', hash(this.username + value));
      }
    },
  },
  {
    sequelize,
    tableName:'users',
  },
);

Address.init (
  {
    customer_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Customer, key: 'id'},
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName:'addresses'
  },
);

Category.init (
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull:false
    }
  },
  {
    sequelize,
    createdAt: false,
    tableName:'categories'
  },
);

Product.init(
  {
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    Description: DataTypes.TEXT,
    Price: DataTypes.DECIMAL(10, 2),
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category, 
        key:'id',
      },
    },
    
  },
  {
    sequelize,
    createdAt: false,
    tableName:'products'
  },
);

Order.init(
  {
    order_amount: DataTypes.STRING(45),
    order_date:   {
      type: DataTypes.DATE,
      allowNull:false
    },
    order_by_id: {
      type: DataTypes.INTEGER,
      references: { model: Customer, key: 'id'},
    }
  },
  {
    sequelize,
    tableName:'orders'
  },
);

Payment.init(
  {
    type:   DataTypes.STRING(50),
    amount: DataTypes.DECIMAL(10, 2),
  },
  {
    sequelize,
    tableName:'payments'
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
    tableName:'carts'
  },
);

Products_Cart.init(
  {
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: Cart, key: 'id' }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: Product, key: 'id' }
    },
    quant: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, 
  {
    sequelize,
    tableName:'products_carts'
  },
)


// create an initialize user (username: alice, password: letmein)
const newUser = User.build({
  username: 'Daniel Moreno', 
  email:'daniel.alsar99@gmail.com',
  password: 'Password1234.',
})
//newUser.save(); 


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





