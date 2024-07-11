import express from 'express';
import { showRegisterForm, registerUser, showLoginForm, loginUser, isAuth , loginGoogle } from '../controllers/userController.js';

const router = express.Router();


router.get('/register', showRegisterForm);
router.post('/register', registerUser);

router.get('/login', showLoginForm);
router.post('/login', loginUser);
router.get('/login/federated/google', loginGoogle)
router.get('/home', isAuth);




export default router;