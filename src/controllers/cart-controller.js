 import cartService from '../services/cart-service.js';

class CartController {
    async addItem(req, res) {
        try {
            const { userId, productId, quantity } = req.body;
            const updatedCart = await cartService.addProductToCart(userId, productId, parseInt(quantity));
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCart(req, res) {
        try {
            const { userId } = req.params;
            const cart = await cartService.getCartByUserId(userId);
            if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new CartController();