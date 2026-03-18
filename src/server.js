import express from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import path from "path";

// Importación de Managers
import { productManager } from "./managers/ProductManager.js"; 
import { msgManager } from "./managers/Messages.manager.js"; 

const app = express();
const PORT = 8080;

// Middlewares iniciales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "src", "public")));

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), "src", "views"));

// Middleware para inyectar Socket.io en las peticiones (útil para controladores externos)
app.use((req, res, next) => {
    req.io = socketServer;
    next();
});

// Rutas
app.use('/', viewsRouter); 

const httpServer = app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT} - http://localhost:${PORT}`);
});

// Configuración de Socket.io
const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    // 1. Carga inicial: Enviamos productos y mensajes guardados en src/db/
    socket.emit('updateProducts', await productManager.getProducts());
    socket.emit('messages', await msgManager.getAll());

    // 2. Lógica de Productos (WebSockets)
    socket.on('addProduct', async (newProd) => {
        await productManager.addProduct(newProd);
        // Emitimos a TODOS los clientes conectados la lista actualizada
        socketServer.emit('updateProducts', await productManager.getProducts());
    });

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id);
        socketServer.emit('updateProducts', await productManager.getProducts());
    });

    // 3. Lógica de Chat (WebSockets)
    socket.on('message', async (msg) => {
        // msg debe ser { user: "nombre", message: "texto" }
        await msgManager.create(msg);
        socketServer.emit('messages', await msgManager.getAll());
    });
});