import UserService from '../services/UserService.js';
import HttpStatus from '../utils/HttpStatus.js';

export default class UserController {
    static async createUser(req, res) {
        const { name, email, password } = req.body;

        const emailAlreadExists = await UserService.emailAlreadyExists(email);
        if (emailAlreadExists) {
            const error = {
                email: ['O email informado já está em uso'],
            };
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }

        try {
            const user = UserService.createUser(name, email, password);
            await user.validate();
            await user.save();
            res.set('Content-Type', 'application/json');
            return res.status(HttpStatus.CREATED).send(JSON.stringify(user));
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
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: JSON.stringify(error) });
        }
    }
}
