import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import session from "express-session";
import passport from "passport";
import env from "dotenv";
env.config();

const PORT = 3000;
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', userRoutes);


try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  
} catch (error) {
  console.error('Unable to connect to the database:', error);
};

app.get('/', (req,res) => {
  res.send('OK');
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
