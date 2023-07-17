import { Router } from 'express'
import {
    logoutUserController
} from '../../controllers/userController.js'
import passport from 'passport';
import { frontResponseRegister,  frontResponseLogin } from '../../passport/local.js'
import { frontResponseGithub } from '../../passport/github.js'

const router = Router();

router.post('/register', passport.authenticate('register', frontResponseRegister));
router.post('/login', passport.authenticate('login', frontResponseLogin))
router.get('/logout', logoutUserController)
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/github-profile', passport.authenticate('github', frontResponseGithub));

export default router