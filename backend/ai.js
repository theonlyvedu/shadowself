import { Configuration, OpenAIApi } from "openai";
import { saveChat, getUserMemory } from "./db.js";

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

export async function processMessage(userId, message) {
    const memory = await getUserMemory(userId);

    const prompt = `You are a digital AI doppelgänger of the user. Here is their past memory: ${memory}. User says: "${message}"`;

    const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "system", content: prompt }],
    });

    const reply = response.data.choices[0].message.content;
    await saveChat(userId, message, reply);
    return reply;
}
