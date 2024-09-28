import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: false,
    },
    password: String,
}, { timestamps: true });

export default mongoose.model("User", UserSchema);