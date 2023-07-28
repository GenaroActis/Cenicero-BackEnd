import TicketDaoMongoDB from "../persistence/daos/mongodb/ticketDao.js";
import CartsDaoMongoDB from "../persistence/daos/mongodb/cartsDao.js";
import { generateCodeTicket } from "../utils.js"
import buyerUserDto from "../persistence/dtos/buyerUserDto.js"
const ticketDao = new TicketDaoMongoDB();
const cartDao = new CartsDaoMongoDB();

export const getTicketByCodeController = async (req, res, next) =>{
    try {
        const { code } = req.params;
        const ticket = await ticketDao.getTicketByCode(code)
        res.json(ticket)
    } catch (error) {
        next(error);
    }
}   
export const getTicketByIdController = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const ticket = await ticketDao.getTicketById(id)
        res.json(ticket)
    } catch (error) {
        next(error);
    }
}
export const generateTicketController = async (req, res, next) =>{
    try {
        const user = req.user;
        const userDto = new buyerUserDto(user)
        const ticketCode = generateCodeTicket()
        const userCart = await cartDao.getCart(user.cartId)
        let totalPriceCart = 0;
        let remainingProducts = []
        userCart.products.forEach((prod) =>{
            const {quantity, _id} = prod
            if(quantity > _id.stock){
                const remainingQuantity = prod.quantity - _id.stock
                prod.quantity = _id.stock
                remainingProducts.push({
                    quantity: remainingQuantity, 
                    _id: _id
                })
            }
            const totalPriceProd = quantity * _id.price
            totalPriceCart += totalPriceProd
        });
        const ticket = {
            remainingProducts: remainingProducts,
            products: userCart,
            code: ticketCode,
            totalPrice: totalPriceCart,
            purchaser: userDto
        }
        res.json(ticket)
    } catch (error) {
        next(error)
    }
} 
export const finalizePurchaseController = async (req, res, next)=>{
    try {
        const confirmedTicket = req.body
        const remainingProducts = confirmedTicket.remainingProducts
        console.log(remainingProducts)
        const savePurchase = {}
        // const savePurchase = await ticketDao.createTicket(confirmedTicket)
        res.json(savePurchase)
    } catch (error) {
        next(error)
    }
}