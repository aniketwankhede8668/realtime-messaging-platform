import { io } from "socket.io-client";

const token =
  localStorage.getItem("token");

const user = JSON.parse(
    localStorage.getItem("user")
  );

const socket = io(
  import.meta.env.VITE_SOCKET_URL,

  {
    autoConnect: false,

    query: {
      username: user?.username
    },
    
    auth: {
      token
    }
  }
);

export default socket;