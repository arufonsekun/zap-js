import User from '../models/User.js';
import { generateUUID } from '../utils/Helpers.js';

export default class UserService {
    static async createUser (name, email, password) {
        const uuid = generateUUID();
        const user = new User({ uuid, name, email, password });
        await user.save();
        return user;
    }
}