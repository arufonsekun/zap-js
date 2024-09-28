import express from 'express';
import v1 from './routes/v1.js';
import { MongoDB } from './config/db.js';

const createApp = () => {
    const app = express();

    MongoDB.connect();

    /**
     * Middleware that parses the request body
     */
    app.use(express.json());

    /**
     * Makes express uses the v1 routes
     */
    app.use('/v1', v1);

    /**
     * Middleware that handles errors
     */
    app.use((err, req, res, next) => {
        res.status(500).json({
            message: err.message
        });
    });

    return app;
}

export default createApp;