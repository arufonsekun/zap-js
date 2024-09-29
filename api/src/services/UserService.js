import User from '../models/User.js';
import { generateUUID } from '../utils/Helpers.js';
import mongoose from 'mongoose';

export default class UserService {
    static createUser(name, email, password) {
        const uuid = generateUUID();
        return new User({ uuid, name, email, password });
    }

    static async emailAlreadyExists(email) {
        const user = await User.findOne({ email });
        return !!user;
    }
}
