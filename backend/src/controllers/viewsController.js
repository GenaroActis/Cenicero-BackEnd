import CartsDaoMongoDB from "../daos/mongodb/cartsDao.js";
import ProductsDaoMongoDB from "../daos/mongodb/productsDao.js";
const cartDao = new CartsDaoMongoDB();
const prodDao = new ProductsDaoMongoDB();

export const getAllProductsController = async (req, res, next) =>{
    try {
        const { page, limit, key, value, sortField, sortOrder } = req.query;
        const allProducts = await prodDao.getAllProducts(page, limit, key, value, sortField, sortOrder);
        const nextLink = allProducts.hasNextPage ? `http://localhost:3000/products/page=${allProducts.nextPage}` : null
        const prevLink = allProducts.hasPrevPage ? `http://localhost:3000/products/page=${allProducts.prevPage}` : null
        const userData = req.user
        const productsFile = {
            results: allProducts.docs,
            userData: userData,
            info: {
                count: allProducts.totalDocs,
                pages: allProducts.totalPages,
                actualPage: allProducts.page,
                hasPrevPage: allProducts.hasPrevPage,
                hasNextPage: allProducts.hasNextPage,
                nextPageLink: nextLink,
                prevPageLink: prevLink
            }
        };
        res.json(productsFile);
    } catch (error) {
        next(error)
    };
};
export const getCartController = async (req, res, next) =>{
    try {
        if(!req.user){
            res.redirect('/')
        }else{
            const userData= req.user
            const cartId = userData.cartId
            const cart = await cartDao.getCart(cartId);
            res.json(cart);
        };
    } catch (error) {
        next(error)
    };
};
export const renderProfile = async(req, res, next) =>{
    try {
        const userData = req.user
        if(!userData){
            res.redirect('/')
        }else{
            res.render('profile', {userData});
        };
    } catch (error) {
        next(error)
    };
};
const renderController = (templateName) => {
    return async (req, res, next) => {
        try {
            res.render(templateName);
        } catch (error) {
            next(error);
        }
    };
};
export const renderRegisterController = renderController('register');
export const renderLoginController = renderController('login');
export const renderRegisterErrorController = renderController('registerError');
export const renderLoginErrorController = renderController('loginError');
