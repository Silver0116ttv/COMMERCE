import { User } from '../models/userModel.js';
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";

const saltRounds = 10;



//-------------------------------------------

export const showRegisterForm = (req, res) => {
    res.render('register');
  };

//--------------------------------------------


export const registerUser = async (req, res) => {
    const { username, password, email} = req.body;
    try {
        const checkResult = await User.findOne({ where: { email: email },  });
        if (checkResult) {
            res.redirect("/login");
          } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
              if (err) {
                console.error("Error hashing password:", err);
              } else {
                const user = await User.create({ username:username , email:email, password:hash });
                req.login(user, (err) => {
                  console.log("success");
                  res.redirect("/secrets");
                });
              }
            });
          }
    } catch (err) {
        console.log(err);
    }
    
  };

//--------------------------------------------

export const showLoginForm = (req, res) => {
  res.render('login.ejs');
}



export const loginUser =  passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/login",
})
  
//--------------------------------------------

export const isAuth = (req, res) => {
  if(req.isAuthenticated()){
    res.render('index.ejs')
  } else {
    res.redirect('/users/register');
  }
}
  
//--------------------------------------------



  passport.use(
    new Strategy(async function verify(username, password, cb) {
      try {
        const user = await User.findOne({ where: { username: username },  });
        if (user) {
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, result) => {
            if (err) {
              //Error with password check
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (result) {
                //Passed password check
                return cb(null, user);
              } else {
                //Did not pass password check
                return cb(null, false);
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
  
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });