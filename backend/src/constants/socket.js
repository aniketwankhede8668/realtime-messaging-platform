export const SOCKET_EVENTS = {

  CONNECTION: "connection",

  DISCONNECT: "disconnect",

  JOIN_ROOM: "join_room",

  SEND_MESSAGE: "send_message",

  RECEIVE_MESSAGE: "receive_message",

  TYPING: "typing",

  STOP_TYPING: "stop_typing",

  ONLINE_USERS: "online_users"
};
  
  export const REDIS_CHANNELS = {
    CHAT_MESSAGES: "CHAT_MESSAGES"
  };
  
  export const QUEUE_JOBS = {
    SAVE_MESSAGE: "SAVE_MESSAGE"
  };