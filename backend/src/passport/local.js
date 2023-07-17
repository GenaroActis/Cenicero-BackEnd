import UsersDaoMongoDB from "../daos/mongodb/usersDao.js";
const userDao = new UsersDaoMongoDB();
import CartsDaoMongoDB from "../daos/mongodb/cartsDao.js";
const cartDao = new CartsDaoMongoDB();
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const strategyConf = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const signup = async (req, email, password, done)=>{
    try {
        const findUser = await userDao.getUserByEmail(email);
        if(!findUser === false){
            throw new Error ('there is already a registered user with that email')
        }else{
            const newCart = await cartDao.createCart()
            const cartId = newCart._id
            req.body.cartId = cartId
            const newUser = await userDao.createUser(req.body);
            if(!newUser){
                return done(null, false);
            } else {
                return done(null, newUser)
            };
        };
    } catch (error) {
        console.log(error)
        return done(error)
    }
};
const login = async (req, email, password, done)=>{
    try {
        const user = {email, password};
        const userLogged = await userDao.loginUser(user)
        if(userLogged){
            return done(null, userLogged)
        }else{
            throw new Error ('Wrong email or password')
        };
    } catch (error) {
        console.log(error)
        return done(error)
    }
};

const signupStrategy = new LocalStrategy(strategyConf, signup);
const loginStrategy = new LocalStrategy(strategyConf, login);

passport.use('register', signupStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done)=>{
    done(null, user._id);
});

passport.deserializeUser(async(id, done)=>{
    const user = await userDao.getUserById(id);
    return done(null, user)
});

export const frontResponseRegister = {
    failureRedirect: '/register/Error',
    successRedirect: '/',
    passReqToCallback: true,
};

export const frontResponseLogin = {
    failureRedirect: '/login/Error',
    successRedirect: '/products',
    passReqToCallback: true,
};
