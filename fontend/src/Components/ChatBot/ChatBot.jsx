import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm your Store Assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef(null);

  // Automatically scrolls to the newest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true); // Shows the typing dots

    try {
      const response = await fetch(
        "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/chatbot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );
      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "I'm having a bit of trouble. Try again?", sender: "bot" },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to server.", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false); // Hides the typing dots
    }
  };

  const clearChat = () => {
    setMessages([
      { text: "Chat cleared. How else can I help?", sender: "bot" },
    ]);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <div className="chat-bubble" onClick={() => setIsOpen(true)}>
          {/* Replaced broken image with Emoji to fix build */}
          <span className="chat-icon-emoji">💬</span>
        </div>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-info">
              <div className="online-dot"></div>
              <span>Store Assistant</span>
            </div>
            <div className="header-actions">
              <button
                className="clear-btn"
                onClick={clearChat}
                title="Clear Chat"
              >
                🗑️
              </button>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>
          </div>

          <div className="chat-messages" ref={scrollRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.sender}`}>
                <div className={`message-bubble ${msg.sender}`}>{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper bot">
                <div className="message-bubble bot typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="send-btn">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
