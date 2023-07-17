import { Router } from 'express'
import productsRouter from './apiRoutes/productsRouter.js';
import cartsRouter from './apiRoutes/cartRouter.js';
import usersRouter from './apiRoutes/userRouter.js';

const router = Router()

router.use('/products', productsRouter);
router.use('/carts', cartsRouter);
router.use('/user', usersRouter);

export default router