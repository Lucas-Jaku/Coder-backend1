import fs from 'fs/promises';
import path from 'path';

class CartManager {
    constructor(filePath) {
        this.path = filePath;
    }

    // Leer archivo y parsear JSON
    async getCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return []; // Si no existe el archivo, retornamos un array vacío
        }
    }

    // Guardar cambios en el archivo
    async saveCarts(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts, null, '\t'));
    }

    // Crear un nuevo carrito vacío
    async createCart() {
        const carts = await this.getCarts();
        const newCart = {
            id: (carts.length > 0 ? carts[carts.length - 1].id + 1 : 1),
            products: []
        };
        carts.push(newCart);
        await this.saveCarts(carts);
        return newCart;
    }

    // Buscar carrito por ID
    async getCartById(cid) {
        const carts = await this.getCarts();
        return carts.find(c => c.id == cid);
    }

    // Lógica principal: Agregar producto al carrito
    async addProductToCart(cid, pid) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(c => c.id == cid);

        if (cartIndex === -1) return null; // Carrito no encontrado

        // Buscamos si el producto ya existe dentro de ese carrito
        const productInCart = carts[cartIndex].products.find(p => p.product == pid);

        if (productInCart) {
            // Si ya existe, incrementamos la cantidad
            productInCart.quantity++;
        } else {
            // Si no existe, lo agregamos con quantity 1
            carts[cartIndex].products.push({
                product: pid,
                quantity: 1
            });
        }

        await this.saveCarts(carts);
        return true;
    }
}

export default CartManager;
