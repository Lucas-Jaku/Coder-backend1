import CartModel from "../models/cart-model.js";

class CartRepository {

    async getCartByUserId(cid) {
        return await CartModel.findById(cid).populate('products.productId');
    }

    async removeProduct(cid, pid) {
        return await CartModel.findByIdAndUpdate(
            cid,
            { $pull: { products: { productId: pid } } },
            { new: true }
        );
    }

    async updateCart(cid, products) {
        return await CartModel.findByIdAndUpdate(
            cid,
            { $set: { products: products } },
            { new: true }
        );
    }

    async updateQuantity(cid, pid, quantity) {
        return await CartModel.findOneAndUpdate(
            { _id: cid, "products.productId": pid },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        );
    }

    async clearCart(cid) {
        return await CartModel.findByIdAndUpdate(
            cid,
            { $set: { products: [] } },
            { new: true }
        );
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