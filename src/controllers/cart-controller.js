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

    async removeProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await cartService.removeProduct(cid, pid);
            res.status(200).json({ status: "success", payload: updatedCart });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    }

    async updateCart(req, res) {
        try {
            const { cid } = req.params;
            const { products } = req.body; 
            const updatedCart = await cartService.updateCart(cid, products);
            res.status(200).json({ status: "success", payload: updatedCart });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    }

    async updateQuantity(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const updatedCart = await cartService.updateQuantity(cid, pid, quantity);
            res.status(200).json({ status: "success", payload: updatedCart });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    }

    async clearCart(req, res) {
        try {
            const { cid } = req.params;
            const updatedCart = await cartService.clearCart(cid);
            res.status(200).json({ status: "success", message: "Carrito vaciado", payload: updatedCart });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    }
}

export default new CartController();

