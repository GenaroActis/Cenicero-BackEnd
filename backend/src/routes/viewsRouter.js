import { Router } from 'express'
import {
    renderRegisterController,
    renderLoginController,
    renderRegisterErrorController,
    renderLoginErrorController, 
    getAllProductsController,
    getCartController,
    renderProfile
} from '../controllers/viewsController.js'
const router = Router();
import { checkAuth } from '../jwt/auth.js';

router.get('/cart', checkAuth, getCartController);
router.get('/products', checkAuth,  getAllProductsController);
router.get('/register', renderRegisterController)
router.get('/', renderLoginController)
router.get('/register/Error', renderRegisterErrorController)
router.get('/login/Error', renderLoginErrorController)
router.get('/github-profile', checkAuth, renderProfile)

export default router