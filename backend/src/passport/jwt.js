import passport from 'passport';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';
import UserDao from '../daos/mongodb/usersDao.js'
const userDao = new UserDao();
import { PrivateKeyJWT } from '../config.js'

const strategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PrivateKeyJWT
};

const cookieExtractor = (req) => {
    const token = req.cookies.token
    return token
}

const strategyOptionsCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: PrivateKeyJWT
};

const verifyToken = async (jwt_payload, done) => {
    console.log('payload--->', jwt_payload);
    const user = await userDao.getUserById(jwt_payload.userId);
    if(!user) return done(null, false)
    return done(null, jwt_payload)
}

passport.use('jwt', new jwtStrategy(strategyOptions, verifyToken));
passport.use('jwtCookies', new jwtStrategy(strategyOptionsCookies, verifyToken));

passport.serializeUser((user, done)=>{
    console.log('user', user);
    done(null, user.userId)
});

passport.deserializeUser(async(id, done)=>{
    const user = await userDao.getUserById(id);
    return done(null, user);
})