import express from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import path from "path";
import {msgManager} from "./managers/Messages.manager.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(path.join(process.cwd(), "src", "public")));
//app.use(express.static(`${process.cwd()}/src/public`)) //para servir archivos estáticos (html, css, js) desde la carpeta 'public'

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars'); //para configurar el motor de plantillas handlebars
app.set('views', path.join(process.cwd(), "src", "views"));
//app.set('views', path`${process.cwd()}/src/views`); //para configurar la carpeta de vistas

app.use('/chat', viewsRouter);
//app.use(logger)


//ROUTES
/*
app.use('/api', apiRouter);
app.use('/', viewsRouter); //para que las rutas de vistas también estén disponibles en la raíz del servidor


//WEBSOCKETS
app.get('/', (req, res) => {
    res.render('websockets') //renderiza la vista 'websockets.handlebars' cuando se accede a la raíz del servidor;
})

//HANDLEBARS

app.use(errorHandler)

app.listen(8080, () => console.log("Server ok en puerto 8080"));


const serverHttp = app.listen(8080, () => console.log("Server ok en puerto 8080"));

const socketServer = new Server(serverHttp);

const products = [];


socketServer.on('connection', (socket) => {
    console.log('Usuario conectado: ${socket.id}');
    socket.on('disconnect', () => {
        console.log('Usuario desconectado: ${socket.id}');
    });

    socket.emit('saludoDesdeBack', 'Bienvenido a websockets!');
    socket.on('respuestaDesdeFront', (mensaje) => {
        console.log(mensaje);
    });

    socketServer.emit('products', products);

    socket.on('newProduct', (product) => {
        products.push(product);
        socketServer.emit('products', products);
    });
});

*/

const httpServer = app.listen(8080, ()=>{
    console.log('🚀 Server listening on port 8080');
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket) => {
    console.log(`Nueva conexion ${socket.id}`);

    socketServer.emit('messages', await msgManager.getAll())    //se emite a todos

    socket.on('newUser', (user)=>{
        socket.broadcast.emit('newUser', user)   //se emite a todos menos al que se conectó
    })

    socket.on('message', async(msg)=>{
        await msgManager.create(msg);
        socketServer.emit('messages', await msgManager.getAll())
    })

    socket.on('typing', (user)=>{
        socket.broadcast.emit('typing', user)
    })
    
})