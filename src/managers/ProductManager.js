const fs = require('fs/promises');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async addProduct(product) {
        const { title, description, code, price, status = true, stock, category, thumbnails = [] } = product;
        
        // Validación de campos obligatorios
        if (!title || !description || !code || !price || !stock || !category) {
            console.error("Todos los campos son obligatorios (excepto thumbnails)");
            return null;
        }

        const products = await this.getProducts();

        // Validar que el código no esté repetido
        if (products.some(p => p.code === code)) {
            console.error("El código del producto ya existe");
            return null;
        }

        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };

        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return newProduct;
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id == id);
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id == id);

        if (index === -1) return null;

        // Extraemos el id de los campos enviados para asegurarnos de que NO se actualice
        const { id: _, ...rest } = updatedFields; 

        // Actualizamos manteniendo el ID original
        products[index] = { ...products[index], ...rest };

        await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const filteredProducts = products.filter(p => p.id != id);

        if (products.length === filteredProducts.length) return null;

        await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, '\t'));
        return true;
    }
}

module.exports = ProductManager;