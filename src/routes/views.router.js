import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

// Ruta Home: Renderiza la lista estática al cargar la página 
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products }); 
});

// Ruta RealTime: Renderiza la vista que usará WebSockets 
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts'); 
});

// Ruta Chat (la que ya tenías)
router.get('/chat', (req, res) => {
    res.render('chat');
});

export default router;