import express from 'express';
import UserController from '../controllers/UserController.js';
import LoginController from '../controllers/LoginController.js';
import MessageController from '../controllers/MessageController.js';
import authenticate from '../middlewares/AuthMiddleware.js';

const v1 = express.Router();

v1.get('/status', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    return res.send(
        '<body style="background-color: black;"><h2><pre style="word-wrap: break-word; white-space: pre-wrap; color: white;"> zap-js api is running... 👍</pre></h2></body>'
    );
});


v1.post('/user', UserController.store);
v1.get('/users', UserController.list);

v1.post('/message', MessageController.store);
v1.get('/messages', MessageController.list);

v1.post('/login', LoginController.login);

export default v1;
