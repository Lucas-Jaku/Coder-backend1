import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    userId: { type: String, required: true, unique: true }, 
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

const CartModel = model('Cart', cartSchema);
export default CartModel;