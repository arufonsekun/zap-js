import { validationResult } from 'express-validator';
import UserService from '../services/UserService.js';
import HttpStatus from '../utils/HttpStatus.js';

export default class UserController {    
    static createUser (req, res) {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            const user = UserService.createUser(name, email, password);
            res.set('Content-Type', 'application/json');
            return res.status(HttpStatus.CREATED).send(JSON.stringify(user));
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ err });
        }
    }
}