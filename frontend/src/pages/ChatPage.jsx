import React from "react";
import { FiSend } from "react-icons/fi";
import useChat from "../hooks/useChat";
import "../styles/chat.css";

export default function ChatBox() {

  const user = JSON.parse(localStorage.getItem("user"));

  const {
    message,
    messages,
    image,
    handleImageUpload,
    sendMessage,
    typingUser,
    onlineUsers,
    messagesEndRef,
    handleTyping
  } = useChat(user.username);

  return (
    <div className="container">
  
      <div className="chatHeader">

    <h1 className="heading">
      💬 Realtime Chat App
    </h1>

    <div className="headerActions">

      <div className="onlineBadge">

        <span className="onlineDot"></span>

        {onlineUsers.length} Online

      </div>

      <button
        className="logoutButton"

        onClick={() => {

          localStorage.clear();

          window.location.reload();
        }}
      >
        Logout
      </button>

    </div>

    </div>
  
      <div className="chatBox">
  
        {messages.map((msg, index) => (
  
            <div
            key={`${msg.sender}-${index}`}

            className={
              msg.sender === user.username

                ? "messageWrapper own"

                : "messageWrapper"
            }
          >

            <div
              className={
                msg.sender === user.username

                  ? "messageCard ownMessage"

                  : "messageCard"
              }
            >
  
            <div className="messageHeader">
  
              <h4 className="sender">
                {msg.sender}
              </h4>
  
              <span className="timestamp">
  
                {
                  msg.createdAt
                    ? new Date(
                        msg.createdAt
                      ).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit"
                        }
                      )
                    : ""
                }
  
              </span>
  
            </div>
  
            {msg.text && (
              <p className="message">
                {msg.text}
              </p>
            )}
  
            {msg.image && (
              <img
                src={msg.image}
                alt="uploaded"
                className="image"
              />
            )}
            </div>
  
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      
      {typingUser && (
      <p className="typingText">

        {typingUser}

      </p>
      )}

      <div className="inputWrapper">
  
        <label className="uploadButton">
  
          +
  
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
  
        </label>
  
        <input
          type="text"
          value={message}
          onChange={(e) =>
            handleTyping(e.target.value)
          }
          placeholder="Type a message"
          className="messageInput"
        />
  
        <button
          onClick={sendMessage}
          className="sendButton"
        >
          <FiSend />
        </button>
  
      </div>
  
      {image && (
  
        <div className="previewContainer">
  
          <p style={{ color: "white" }}>
            Image Preview:
          </p>
  
          <img
            src={image}
            alt="preview"
            className="previewImage"
          />
  
        </div>
      )}
  
    </div>
  );
}