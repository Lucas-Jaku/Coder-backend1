/*
const socketClient = io();

socketClient.on('saludoDesdeBack', (mensaje) => {
    console.log(mensaje);
    socketClient.emit('respuestaDesdeFront', 'Gracias por el saludo, back!');
})

const form = document.getElementById('form')
const inputName = document.getElementById('name')
const inputPrice = document.getElementById('price')
const productsContainer = document.getElementById('products')

form.onsubmit = (e) => {
    e.preventDefault();
    const product = {
        name: inputName.value,
        price: inputPrice.value
    }
    socketClient.emit('newProduct', product)
}

socketClient.on('products', (products)=>{
    let listadoProds = ''
    products.forEach((p) => {
        listadoProds += `${p.name} - $${p.price} <br>`
    })
    productsContainer.innerHTML = listadoProds
})
*/    