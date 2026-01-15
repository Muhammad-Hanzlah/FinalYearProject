import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your Store Assistant. How can I help you find something today?", sender: "bot" }
    ]);
    const scrollRef = useRef(null);

    // Auto-scroll to the latest message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        try {
            // This URL will talk to the backend we build in Phase 2
            const response = await fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();
            setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
        } catch (error) {
            setMessages((prev) => [...prev, { text: "I'm currently connecting to my brain. Please try again in a moment!", sender: "bot" }]);
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="header-info">
                            <div className="online-dot"></div>
                            <span>Store AI Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)}>×</button>
                    </div>
                    <div className="chat-body" ref={scrollRef}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`message-bubble ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-footer">
                        <input 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about products..."
                        />
                        <button onClick={handleSend}>➤</button>
                    </div>
                </div>
            )}
            <div className={`chat-bubble ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '×' : '💬'}
            </div>
        </div>
    );
};

export default ChatBot;