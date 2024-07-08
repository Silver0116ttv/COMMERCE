import express from 'express';
import { showRegisterForm, registerUser, showLoginForm, loginUser, isAuth } from '../controllers/userController.js';

const router = express.Router();


router.get('/register', showRegisterForm);
router.get('/login', showLoginForm);
router.get('/home', isAuth);

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;