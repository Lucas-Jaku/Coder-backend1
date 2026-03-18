import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
    constructor(fileName) {
        // Definimos la ruta hacia la carpeta db que creaste
        this.path = path.join(process.cwd(), "src", "db", fileName);
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(data);
            }
            return [];
        } catch (error) {
            console.error("Error al leer productos:", error);
            return [];
        }
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts();
            const newProduct = {
                id: uuidv4(),
                title: product.title,
                price: product.price,
                status: true
            };
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return newProduct;
        } catch (error) {
            console.error("Error al guardar producto:", error);
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProducts();
            const filteredProducts = products.filter(p => p.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, '\t'));
            return true;
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            return false;
        }
    }
}

export const productManager = new ProductManager("products.json");