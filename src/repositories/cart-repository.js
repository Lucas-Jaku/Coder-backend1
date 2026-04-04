import CartModel from "../models/cart-model.js";

class CartRepository {
    async getCartByUserId(userId) {
        return await CartModel.findOne({ userId }).populate('products.productId');
    }

    async save(cartData) {
        
        return await CartModel.findOneAndUpdate(
            { userId: cartData.userId },
            { $set: cartData }, 
            { upsert: true, new: true }
        );
    }
}

export default new CartRepository(); 