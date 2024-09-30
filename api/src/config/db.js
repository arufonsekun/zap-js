import mongoose from "mongoose";

class MongoDB {
    static async connect() {
        try {
            const MONGO_URI = process.env.MONGO_URI;
            if (!MONGO_URI) {
                throw new Error('MONGO_URI is required');
            }
            await mongoose.connect(process.env.MONGO_URI);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}

export { MongoDB };