import UserService from '../services/UserService.js';
import HttpStatus from '../utils/HttpStatus.js';

export default class UserController {
    static async store(req, res) {
        const { name, email, password } = req.body;

        const emailAlreadExists = await UserService.emailAlreadyExists(email);
        if (emailAlreadExists) {
            const error = {
                errors: {
                    email: ['O email informado já está em uso'],
                }
            };
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }

        try {
            await UserService.createUser(name, email, password);
            res.set('Content-Type', 'application/json');
            return res.status(HttpStatus.CREATED).send(JSON.stringify({ message: 'Usuário criado com sucesso' }));
        } catch (error) {
            if (error.name === 'ValidationError') {
                const validationErrors = {};
                Object.values(error.errors).forEach((e) => {
                    if (validationErrors[e.path]) {
                        validationErrors[e.path].push(e.message);
                        return;
                    }
                    validationErrors[e.path] = [e.message];
                });

                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .json({ errors: validationErrors });
            }

            console.log(error);            
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: error });
        }
    }

    static async list(req, res) {
        const users = await UserService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }
}
