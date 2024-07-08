import { User } from '../models/userModel.js';



export const showRegisterForm = (req, res) => {
    res.render('register');
  };



export const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const newUser = User.build({ username: username, email: email, password: password });
        if(newUser)
            {
                await newUser.save();
                res.redirect('/users/login');
            }
    } catch (error) {
        console.error('Problem executing signup, error: ', error);
    }
    
  };



export const showLoginForm = (req, res) => {
    res.render('login');
  };



export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username: username },  });
            if (!user) {
                return false;
            }
            const hashedPassword = hash(username + password);
            if (hashedPassword === user.password) {
                //res.status(200).send(JSON.stringify(user, null, 2));
                res.redirect('/dashboard');
            } else {
                res.redirect('/users/login');
                //res.send(JSON.stringify('Username or password wrong please try again'))
            }

    } catch (error) {
            console.error('Error verifying el login:', error);
        }
  };
