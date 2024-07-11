import express from 'express';
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.get('/', (req, res) => {  res.send('Bienvenido a la aplicación principal'); });
  

router.use('/users', userRoutes);

export default router;
 



