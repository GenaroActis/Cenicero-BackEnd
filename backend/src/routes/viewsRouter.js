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
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'

router.get('/cart', ensureAuthenticated, getCartController);
router.get('/products', ensureAuthenticated, getAllProductsController);
router.get('/register', renderRegisterController)
router.get('/', renderLoginController)
router.get('/register/Error', renderRegisterErrorController)
router.get('/login/Error', renderLoginErrorController)
router.get('/github-profile', renderProfile)

export default router