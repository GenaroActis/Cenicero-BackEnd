import UserDao from '../daos/mongodb/usersDao.js'
import CartsDaoMongoDB from "../daos/mongodb/cartsDao.js";
const cartDao = new CartsDaoMongoDB();
const userDao = new UserDao() 
import { generateToken } from '../jwt/auth.js';

export const register = async(req, res, next)=>{
    try {
        const { firstName, lastName, email, age, password } = req.body;
        const exist = await userDao.getUserByEmail(email);
        if(exist) return res.status(400).json({ msg: 'User already exists' });
        const newCart = await cartDao.createCart()
        const user = {firstName, lastName, email, age, password, cartId:newCart}
        const newUser = await userDao.createUser(user);
        const token = generateToken(newUser);
        res.json({
            msg: 'Register OK',
            token
        })
    } catch (error) {
        next(error);
    }
};

export const login = async(req, res, next)=>{
    try {
        const { email, password } = req.body;
        const user = await userDao.loginUser({email, password});
        if(!user){
        res.json({msg: 'invalid credentials'});
        }
        const access_token = generateToken(user)
        res
            .header('Authorization', access_token)
            .json({msg: 'Login OK', access_token})
    } catch (error) {
        next(error);
    }
}

export const logoutUserController = async (req, res, next) =>{
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else{
                res.redirect('/');
            };
        });
    } catch (error) {
        next(error)
    };
};
