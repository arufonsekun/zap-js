import express from 'express';
import v1 from './routes/v1.js';
import { MongoDB } from './config/db.js';
import passport from './auth/passportConfig.js';
import http from 'http';
import { Server } from 'socket.io';
import WebsocketController from './controllers/WebsocketController.js';

const createApp = () => {
    const app = express();

    const server = http.createServer(app);

    const ws = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
        },
    });

    MongoDB.connect();

    /**
     * Setup middleware that checks requests body
     */
    app.use(express.urlencoded({ extended: true }));

    /**
     * Middleware that parses the request body
     */
    app.use(express.json());

    app.use(passport.initialize());

    /**
     * Makes express uses the v1 routes
     */
    app.use('/api/v1', v1);

    /**
     * Middleware that handles errors
     */
    app.use((err, req, res, next) => {
        res.status(500).json({
            message: err.message,
        });
    });

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
        console.log(`zap-js api running on port ${PORT}`);
    });

    const ONLINE_USERS = {};
    ws.on('connection', (socket) => {
       
        socket.emit('message', 'Bem vindo ao chat!');

        socket.on('online', (payload) => {
            
            const onlineUsers = Object.keys(ONLINE_USERS).reduce((acc, curr) => {
                acc[curr] = 'online';
                return acc;
            }, {});

            socket.emit('onlineusers', {
                onlineUsers,
            });
            
            ONLINE_USERS[payload.uuid] = socket.id;
            ws.emit('userstatus', {
                status: 'online',
                uuid: payload.uuid,
            });
        });

        socket.on('offline', (payload) => {
            delete ONLINE_USERS[payload.uuid];

            ws.emit('userstatus', {
                status: 'offline',
                uuid: payload.uuid,
                name: payload.name,
            });
        });

        socket.on('newmessage', (payload) => {
            const recipientSocketId = ONLINE_USERS[payload.recipientId];

            ws.to(recipientSocketId).emit('message', {
                ...payload,
            });
        });
    });

    return app;
};

export default createApp;
