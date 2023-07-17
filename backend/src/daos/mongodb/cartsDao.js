import {CartsModel} from './models/cartsModel.js';

export default class CartsDaoMongoDB {
    async createCart() {
        try {
        const response = await CartsModel.create({});
        return response;
        } catch (error) {
        console.log(error);
        throw new Error(error);
        };
    };
    async getCart(id) {
        try {
            const response = await CartsModel.findOne({ _id: id }).populate('products._id')
            return response;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        };
    };
    async addProductToCart(prodId, cartId){
        try {
            const cartFind = await CartsModel.findById(cartId)
            if(!cartFind) throw new Error ("Cart not found")
            const existingProduct = await cartFind.products.find(productIt => productIt._id === prodId);
            if(existingProduct){
                const updatedQuantity = existingProduct.quantity + 1
                await CartsModel.updateOne(
                    {_id: cartId, 'products._id': prodId},
                    {$set: {'products.$.quantity': updatedQuantity}}
                );
            } else{
                await CartsModel.findOneAndUpdate(
                    {_id: cartId},
                    {$push: {products: {_id: prodId, quantity: 1}}},
                );
            };
            const cartUpdate = await CartsModel.findById(cartId).populate('products._id');
            return cartUpdate
        } catch (error) {
            console.log(error);
            throw new Error(error);
        };
    };
    async deleteProductToCart (prodId, cartId){
        try {
            const cartFind = await CartsModel.findById(cartId);
            const existingProduct = await cartFind.products.find(productIt => productIt._id === prodId);
            if(!existingProduct){
                throw new Error('the product you are trying to remove does not exist')
            } else{
                if(existingProduct.quantity > 1){
                    const updatedQuantity = existingProduct.quantity - 1
                    await CartsModel.updateOne(
                        {_id: cartId, 'products._id': prodId},
                        {$set: {'products.$.quantity': updatedQuantity}}
                    );
                } else{
                    await CartsModel.findOneAndUpdate(
                        {_id: cartId},
                        {$pull: {products: {_id: prodId}}},
                    );
                };
            };
            const cartUpdate = await CartsModel.findById(cartId).populate('products._id')
            return cartUpdate
        } catch (error) {
            console.log(error);
            throw new Error(error);
        };
    };
    async deleteAllProductsToCart (cartId) {
        try {
            const cartFind = await CartsModel.findById(cartId);
            if(!cartFind){
                throw new Error('the cart you are trying to update does not exist')
            } else{
                const emptyCart = await CartsModel.updateOne(
                    { _id: cartId },
                    { $set: { products: [] } }
                );
                return emptyCart
            };
        } catch (error) {
            console.log(error);
            throw new Error(error);
        };
    };
    async updateQuantityOfProduct (cartId, prodId, newQuantity) {
        try {
            const cartFind = await CartsModel.findById(cartId);
            const existingProduct = await cartFind.products.find(productIt => productIt._id === prodId);
            if(!existingProduct){
                throw new Error('the product you are trying to update does not exist')
            } else{
                existingProduct.quantity = newQuantity
                if(existingProduct.quantity > 1){
                    await CartsModel.updateOne(
                        {_id: cartId, 'products._id': prodId},
                        {$set: {'products.$.quantity': newQuantity}}
                    );
                } else{
                    await CartsModel.findOneAndUpdate(
                        {_id: cartId},
                        {$pull: {products: {_id: prodId}}},
                    );
                };
            };
            const cartUpdate = await CartsModel.findById(cartId).populate('products._id')
            return cartUpdate
        } catch (error) {
            console.log(error);
            throw new Error(error);
        };
    };
};