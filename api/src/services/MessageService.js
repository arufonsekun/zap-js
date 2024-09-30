import Message from '../models/Message.js';

export default class MessageService {
    static async createMessage(senderId, recipientId, content) {
        return await Message.create({ senderId, recipientId, content });
    }

    static async getMessages(senderId, recipientId) {
        return await Message.find({
            senderId: [senderId, recipientId],
            recipientId: [senderId, recipientId],
        }).sort({ createdAt: 1 });
    }
}
