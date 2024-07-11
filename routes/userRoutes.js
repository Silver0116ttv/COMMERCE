import express from 'express';
import { showRegisterForm, registerUser, showLoginForm, loginUser, isAuth , loginGoogle } from '../controllers/userController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to users handling page');
});
router.get('/register',     showRegisterForm);
router.post('/register',    registerUser);

router.get('/login',                    showLoginForm);
router.post('/login',                   loginUser);
router.get('/login/federated/google',   loginGoogle);

router.get('/auth', isAuth);




export default router;