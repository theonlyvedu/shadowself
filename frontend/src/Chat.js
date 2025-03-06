import React, { useState } from "react";
import { sendMessage } from "../services/api";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input) return;
        const userMessage = { sender: "You", text: input };
        setMessages([...messages, userMessage]);

        const response = await sendMessage(input);
        setMessages([...messages, userMessage, { sender: "AI", text: response }]);
        setInput("");
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
                ))}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default Chat;
