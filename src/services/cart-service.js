import cartRepository from '../repositories/cart-repository.js';
import productRepository from '../repositories/product-repository.js';

class CartService {
    async addProductToCart(userId, productId, quantity) {
        //Validar que el producto existe en Mongo
        const product = await productRepository.getById(productId); 
        if (!product) throw new Error("Producto no encontrado en la base de datos");

        //Obtener el carrito del usuario
        let cart = await cartRepository.getCartByUserId(userId);
        
        //Si no existe, preparamos un objeto nuevo
        if (!cart) {
            cart = { userId, products: [], totalPrice: 0 };
        }

        //Buscar si el producto ya está en el array del carrito
        const existingProduct = cart.products.find(p => 
            p.productId._id?.toString() === productId || p.productId.toString() === productId
        );

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        //Guardar cambios en Mongo a través del repo
        return await cartRepository.save(cart);
    }

    async getCartByUserId(userId) {
        return await cartRepository.getCartByUserId(userId);
    }
}

export default new CartService();
