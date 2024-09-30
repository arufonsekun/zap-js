import User from '../models/User.js';
import { generateUUID } from '../utils/Helpers.js';
import bcryptjs from 'bcryptjs';

export default class UserService {
    static async createUser(name, email, password) {
        const uuid = generateUUID();
        const user = new User({ uuid, name, email, password });
		const salt = await bcryptjs.genSalt();
        user.password = await bcryptjs.hash(password, salt);
		await user.save();
		return user;
    }

    static async emailAlreadyExists(email) {
        const user = await User.findOne({ email });
        return !!user;
    }

	static async getUsers() {
		return await User.find({});
	}
}
