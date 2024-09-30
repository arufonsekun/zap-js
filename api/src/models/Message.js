import mongoose from 'mongoose';;

const MessageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            trim: true,
			required: [true, 'O conteúdo é obrigatório'],
			maxLength: [1024, 'O conteúdo não pode ter mais de 1024 caracteres'],
        },
        senderId: {
            type: String,
            required: [true, 'O senderID é obrigatório'],
            lowercase: true,
            trim: false,
        },
        recipientId: {
            type: String,
            required: [true, 'O recipientId é obrigatório'],
            lowercase: true,
            trim: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Message', MessageSchema);
