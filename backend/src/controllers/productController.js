import ProductsDaoMongoDB from "../daos/mongodb/productsDao.js";
const prodDao = new ProductsDaoMongoDB();

export const getProductByIdController = async (req, res, next) =>{
    try {
        const {idSearched} = req.params;
        const productSearched = await prodDao.getProductById(idSearched);
        if(!productSearched){
            throw new Error('the searched id does not correspond to an existing product')
        } else{
            res.json(productSearched)
        };
    } catch (error) {
        next(error)
    };
};
export const createProductController = async (req, res, next) =>{
    try {
        const { title, description, price, stock, code, category, size } = req.body
        const addedProduct = await prodDao.createProduct({
            title,
            description,
            price,
            stock,
            code,
            category,
            size
        })
        if(!addedProduct){
            throw new Error('One of the fields is not correct')
        } else{
            res.json(addedProduct)
        };
    } catch (error) {
        next(error)
    };
};
export const deleteProductController = async (req, res, next) =>{
    try {
        const { id } = req.params
        await prodDao.deleteProduct(id)
        res.send(`product with id ${id} deleted!`)
    } catch (error) {
        next(error)
    };
};
export const updateProductController = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const {title, description, price, stock, code} = req.body;
        const existingValidator = await prodDao.getProductById(id);
        if (!existingValidator) {
            throw new Error('Product not found!');
        } else{
            const prodUpdated = await prodDao.updateProduct(
                id,
                { title, description, price, stock, code }
            );
            res.json(prodUpdated);
        };
    } catch (error) {
        next(error)
    };
};
export const getProductBySomethingController = async (req, res, next) =>{
    try {
        const {key} = req.params;
        const {value} = req.params;
        const productSearched = await prodDao.getProductBySomething(key, value)
        if(!productSearched) throw new Error ("Product not found!")
        res.json(productSearched)
    } catch (error) {
        next(error)
    };
};
