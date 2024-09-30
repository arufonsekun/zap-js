import MessageService from "../services/MessageService.js";

export default class MessageController {
    static async store(req, res) {
        const { senderId, recipientId, content } = req.body;        
        const message = await MessageService.createMessage(senderId, recipientId, content);
        return res.status(200).json({ message });
    }

    static async list(req, res) {
        const { senderId, recipientId } = req.query;

        const messages = await MessageService.getMessages(senderId, recipientId);
        return res.status(200).json(messages);
    }
}