import { Router } from 'express'
import { 
    generateTicketController,
    getTicketByIdController,
    finalizePurchaseController 
} from '../../controllers/ticketController.js'
import { checkAuth } from '../../jwt/auth.js';
const router = Router()

router.get('/:id', checkAuth, generateTicketController)
router.post('/finalizePurchase', checkAuth, finalizePurchaseController)

export default router