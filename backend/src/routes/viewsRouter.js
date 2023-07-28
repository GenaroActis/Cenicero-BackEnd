import { Router } from 'express'
import {
    getAllProductsController,
    getCartController,
    renderProfile
} from '../controllers/viewsController.js'
const router = Router();
import { checkAuth } from '../jwt/auth.js';

router.get('/cart', checkAuth, getCartController);
router.get('/products', checkAuth,  getAllProductsController);
router.get('/github-profile', checkAuth, renderProfile)

export default router