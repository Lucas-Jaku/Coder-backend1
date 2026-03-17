/*
import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
const router = Router();
const manager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.json({ status: "success", payload: products });
});

router.get('/:pid', async (req, res) => {
    const product = await manager.getProductById(req.params.pid);
    product ? res.json(product) : res.status(404).json({ error: "Producto no encontrado" });
});

router.post('/', async (req, res) => {
    const result = await manager.addProduct(req.body);
    result ? res.status(201).json({ status: "success", message: "Producto agregado" }) 
           : res.status(400).json({ error: "Datos incompletos o inválidos" });
});

router.put('/:pid', async (req, res) => {
    const updated = await manager.updateProduct(req.params.pid, req.body);
    updated ? res.json({ message: "Producto actualizado" }) : res.status(404).json({ error: "Error al actualizar" });
});

router.delete('/:pid', async (req, res) => {
    const deleted = await manager.deleteProduct(req.params.pid);
    deleted ? res.json({ message: "Producto eliminado" }) : res.status(404).json({ error: "No se pudo eliminar" });
});

export default router;
*/