import express from 'express';
import UserController from '../controllers/UserController.js';

const v1 = express.Router();

v1.get('/status', (req, res, next) => {
    res.set('Content-Type', 'text/html')
    return res.send('<body style="background-color: black;"><h2><pre style="word-wrap: break-word; white-space: pre-wrap; color: white;"> zap-js api is running... 👍</pre></h2></body>');
});

/**
 * User related routes
 */
v1.post('/user', UserController.createUser);

export default v1;