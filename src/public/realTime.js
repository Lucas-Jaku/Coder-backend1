const socket = io(); // Conexión al servidor 

const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');

// Escuchamos la actualización de la lista
socket.on('updateProducts', (products) => {
    productList.innerHTML = ''; // Limpiamos la lista actual
    products.forEach(prod => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${prod.title}</strong> - $${prod.price}</span>
            <button onclick="deleteProd('${prod.id}')">Eliminar</button>
        `;
        productList.appendChild(li);
    });
});

// Enviamos el nuevo producto al servidor por Socket (No por HTTP POST)
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    
    socket.emit('addProduct', { title, price });
    productForm.reset();
});

// Función global para eliminar
window.deleteProd = (id) => {
    socket.emit('deleteProduct', id);
};