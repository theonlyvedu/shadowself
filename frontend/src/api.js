import axios from "axios";

export const sendMessage = async (message) => {
    const response = await axios.post("http://localhost:5000/chat", { message, userId: "123" });
    return response.data.reply;
};
