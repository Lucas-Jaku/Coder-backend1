const socket = io();
let user;

// Pedimos el nombre de usuario al cargar la página
Swal.fire({
    title: "Identifícate",
    input: "text",
    text: "Ingresa tu nombre de usuario para el chat",
    inputValidator: (value) => !value && "¡Necesitas un nombre!",
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit('newUser', user);
});


// --- REALTIME CHAT ---
const chatInput = document.getElementById('message');
const sendBtn = document.getElementById('send');


sendBtn.addEventListener('click', () => {
    const messageText = chatInput.value.trim();
    if (messageText.length > 0) {
        // Enviamos 'user' (el que guardaste al inicio) y 'message'
        socket.emit('message', { user: 'nombre', message: 'texto' });
        chatInput.value = '';
    }
});

// Escuchamos los mensajes actualizados desde el servidor
socket.on('messages', (messages) => {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = messages.map(m => `<p><strong>${m.user}</strong>: ${m.message}</p>`).join('');
});

