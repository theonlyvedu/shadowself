import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const ChatSchema = new mongoose.Schema({ userId: String, message: String, reply: String });

const Chat = mongoose.model("Chat", ChatSchema);

export async function saveChat(userId, message, reply) {
    await new Chat({ userId, message, reply }).save();
}

export async function getUserMemory(userId) {
    const chats = await Chat.find({ userId }).limit(10);
    return chats.map(chat => `User: ${chat.message} AI: ${chat.reply}`).join("\n");
}
