import { Router } from "express";
import {
    getProductByIdController,
    createProductController,
    deleteProductController,
    updateProductController,
    getProductBySomethingController
} from '../../controllers/productController.js';
import { checkAuth } from '../../jwt/auth.js';
const router = Router();
import { ensureIsAdmin } from '../../middlewares/ensureIsAdmin.js'
import { validateCreateProduct } from '../../middlewares/validators/productValidator.js'

router.get('/:id', checkAuth, getProductByIdController);
router.post('/', ensureIsAdmin, validateCreateProduct, createProductController);
router.put('/:id', ensureIsAdmin, updateProductController);
router.delete('/:id', ensureIsAdmin, deleteProductController);
router.get('/search/:key/:value', getProductBySomethingController);

export default router