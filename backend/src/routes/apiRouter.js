import { Router } from 'express'
import productsRouter from './apiRoutes/productsRouter.js';
import cartsRouter from './apiRoutes/cartRouter.js';
import usersRouter from './apiRoutes/userRouter.js';
import ticketRouter from './apiRoutes/ticketRouter.js'
import ensureAdmin from './apiRoutes/ensureAdmin.js'

const router = Router()

router.use('/products', productsRouter);
router.use('/carts', cartsRouter);
router.use('/user', usersRouter);
router.use('/ticket', ticketRouter)
router.use('/admin', ensureAdmin)

export default router