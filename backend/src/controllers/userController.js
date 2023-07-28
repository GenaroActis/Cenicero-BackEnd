import UsersDaoMongoDB from '../persistence/daos/mongodb/usersDao.js'
import CartsDaoMongoDB from "../persistence/daos/mongodb/cartsDao.js";
const cartDao = new CartsDaoMongoDB();
const userDao = new UsersDaoMongoDB(); 
import { generateToken } from '../jwt/auth.js';

export const register = async(req, res, next)=>{
    try {
        const { firstName, lastName, email, age, password } = req.body;
        const exist = await userDao.getUserByEmail(email);
        if(exist) return res.status(400).json({errors:[{ msg: 'EmailAlreadyRegistered' }]});
        const newCart = await cartDao.createCart()
        const user = {firstName, lastName, email, age, password, cartId:newCart}
        if(firstName === 'admin'){user.role = 'admin'}
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
        } else{
            if(user === 'isGithub') {
                res.json({msg: 'isGithub'})
            } else{
                const accessToken = generateToken(user)
            res
                .header('Authorization', accessToken)
                .json({msg: 'Login OK', accessToken})
            }
        }
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

export const ensureIsAdminController = async (req, res, next) =>{
    try {
        if(req.user.role === "admin"){
            res.json({msg:'authorized user'})
        } else{
            res.json({msg:'unauthorized user'})
        }
    } catch (error) {
        next(error)
    }
}
