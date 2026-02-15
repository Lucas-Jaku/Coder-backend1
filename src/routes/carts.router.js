const { Router } = require('express');
const CartManager = require('../managers/CartManager');
const router = Router();
const manager = new CartManager('./src/data/carts.json');

router.post('/', async (req, res) => {
    const newCart = await manager.createCart();
    res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
    const cart = await manager.getCartById(req.params.cid);
    cart ? res.json(cart.products) : res.status(404).json({ error: "Carrito no encontrado" });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const result = await manager.addProductToCart(req.params.cid, req.params.pid);
    result ? res.json({ message: "Producto agregado al carrito" }) : res.status(400).json({ error: "Error en la operación" });
});

module.exports = router;