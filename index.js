import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './config/database.js';
import userRoutes from './routes/userRoutes.js';

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  
} catch (error) {
  console.error('Unable to connect to the database:', error);
};


const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', userRoutes);




app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});