import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../persistence/daos/mongodb/usersDao.js';
import CartsDaoMongoDB from "../persistence/daos/mongodb/cartsDao.js";
import { generateToken } from '../jwt/auth.js';
import { ClientIDGithub, ClientSecretGithub, CallbackGithub, FrontUrl } from '../config.js';
import logger from '../utils/logger.js';
const userDao = new UserDao();
const cartDao = new CartsDaoMongoDB();

const strategyOptions = {
    clientID : ClientIDGithub,
    clientSecret: ClientSecretGithub,
    callbackURL: CallbackGithub,
    origin: FrontUrl,
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) => {
    try {
        const email = profile._json.email
        const user = await userDao.getUserByEmail(email);
        if(user) {
            await userDao.updateLastActivity(user._id)
            const token = generateToken(user)
            return done(null, token)
        }else {
            const newCart = await cartDao.createCart()
            const cartId = newCart._id
            const newUser = await userDao.createUser({
                firstName : profile._json.name.split(' ')[0],
                lastName: profile._json.name.split(' ')[1],
                email: email,
                password: '',
                isGithub: true,
                cartId: cartId
            });
            const token = generateToken(newUser)
            return done(null, token)
        };
    } catch (error) {
        logger.error(error)
    };
};

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));

export const frontResponseGithub = (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        res.header('Authorization', user)
        .redirect(`${FrontUrl}/github/${user}`)
    })(req, res, next);
};