import HttpStatus from '../utils/HttpStatus.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcryptjs from 'bcryptjs';

export default class LoginController {
    static async login(req, res) {

        const { email, password } = req.body;
        
        try {
            const user = await User.findOne({email: email});

            if (!user) {
                return res.status(HttpStatus.UNAUTHORIZED).json({errors: {email: "Usuário não encontrado"}});
            }

            const isValid = await bcryptjs.compare(password, user.password);
            if (!isValid) {
                return res.status(HttpStatus.UNAUTHORIZED).json({errors: {password: 'Senha inválida'}});
            }

            const SECRET_KEY = process.env.JWT_SECRET;

            const token = jwt.sign({
                uuid: user.uuid,
                email: user.email,
                name: user.name,
            }, SECRET_KEY, { expiresIn: '60h' });

            return res.status(HttpStatus.OK).json({
                token
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
}
