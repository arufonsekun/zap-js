
import { body } from 'express-validator';

const CREATE_USER_VALIDATION = [
    body('name').isString().isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 8 })
];

export { CREATE_USER_VALIDATION };