import express from 'express';
import cartController from '../controllers/cart-controller.js';

const router = express.Router();

router.delete('/:cid/products/:pid', cartController.removeProduct); // Eliminar producto del carrito
router.put('/:cid', cartController.updateCart);                   // Actualizar todo el carrito
router.put('/:cid/products/:pid', cartController.updateQuantity); // Actualizar solo cantidad
router.delete('/:cid', cartController.clearCart);                 // Vaciar carrito
router.get('/:cid', cartController.getCart);                      // Obtener con populate

export default router;
