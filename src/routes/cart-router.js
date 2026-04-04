import express from 'express';
import cartController from '../controllers/cart-controller.js';

const router = express.Router();

// Ruta para agregar productos: POST http://localhost:PORT/api/cart/add
router.post('/add', cartController.addItem);

// Ruta para ver el carrito: GET http://localhost:PORT/api/cart/:userId
router.get('/:userId', cartController.getCart);

export default router;
