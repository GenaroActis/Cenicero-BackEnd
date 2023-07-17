import { Router } from "express";
import {
    getProductByIdController,
    createProductController,
    deleteProductController,
    updateProductController,
    getProductBySomethingController
} from '../../controllers/productController.js';

const router = Router();

router.get('/:id', getProductByIdController);
router.post('/', createProductController);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProductController);
router.get('/search/:key/:value', getProductBySomethingController);

export default router