import axios from "axios";
import {
  useEffect,
  useRef,
  useState
} from "react";
import socket from "../socket/socket";

export default function useChat(username) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const typingTimeout = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const fetchMessages = async () => {

    try {
  
      const response = await axios.get(
        import.meta.env.VITE_MESSAGES_API
      );
  
      setMessages(response.data);
  
    } catch (error) {
  
      console.error(error);
    }
  };

  useEffect(() => {
    scrollToBottom();
    fetchMessages();
    socket.connect();
  
    socket.emit(
      "join_room",
      "general"
    );
  
    const receiveMessageHandler =
      (data) => {
  
        setMessages((prev) => [
          ...prev,
          data
        ]);
      };
  
    const typingHandler =
      (typingUsername) => {
  
        if (
          typingUsername !== username
        ) {
  
          setTypingUser(
            `${typingUsername} is typing...`
          );
        }
      };
  
    const stopTypingHandler =
      () => {
  
        setTypingUser("");
      };
  
    const onlineUsersHandler =
      (users) => {
  
        setOnlineUsers(users);
      };
  
    socket.on(
      "receive_message",
      receiveMessageHandler
    );
  
    socket.on(
      "typing",
      typingHandler
    );
  
    socket.on(
      "stop_typing",
      stopTypingHandler
    );
  
    socket.on(
      "online_users",
      onlineUsersHandler
    );
  
    return () => {
  
      socket.off(
        "receive_message",
        receiveMessageHandler
      );
  
      socket.off(
        "typing",
        typingHandler
      );
  
      socket.off(
        "stop_typing",
        stopTypingHandler
      );
  
      socket.off(
        "online_users",
        onlineUsersHandler
      );

      // socket.disconnect();
    };
  
  }, [username]);

  useEffect(() => {

    scrollToBottom();
  
  }, [messages]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const MAX_WIDTH = 400;

        const scaleSize = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          img,
          0,
          0,
          canvas.width,
          canvas.height
        );

        const compressedBase64 = canvas.toDataURL(
          "image/jpeg",
          0.7
        );

        setImage(compressedBase64);
      };
    };

    reader.readAsDataURL(file);
  };

  const sendMessage = () => {
    if (!message && !image) return;

    socket.emit("send_message", {
      roomId: "general",
      sender: username,
      text: message,
      image: image || ""
    });

    setMessage("");
    setImage(null);
  };

  const handleTyping = (value) => {

    setMessage(value);
  
    if (!value.trim()) {
  
      socket.emit("stop_typing");
  
      return;
    }
  
    socket.emit(
      "typing",
      username
    );
  
    clearTimeout(
      typingTimeout.current
    );
  
    typingTimeout.current =
      setTimeout(() => {
  
        socket.emit(
          "stop_typing"
        );
  
      }, 1000);
  };

  return {
    message,
    setMessage,
    messages,
    image,
    handleImageUpload,
    sendMessage,
    typingUser,
    onlineUsers,
    handleTyping,
    messagesEndRef,
    scrollToBottom
  };
}