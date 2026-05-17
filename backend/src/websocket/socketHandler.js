import { publisher, subscriber } from "../config/redis.js";
import { QUEUE_JOBS, REDIS_CHANNELS, SOCKET_EVENTS } from "../constants/socket.js";
import { messageQueue } from "../queues/messageQueue.js";

const onlineUsers = new Map();

export const socketHandler = (io) => {

  subscriber.subscribe(REDIS_CHANNELS.CHAT_MESSAGES);

  subscriber.on("message", (channel, data) => {
    try {

      const message = JSON.parse(data);

      io.to(message.roomId).emit(
        SOCKET_EVENTS.RECEIVE_MESSAGE,
        message
      );

    } catch (error) {
      console.error(error.message);
    }
  });

  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {

    const username = socket.handshake.query.username;

    if (username) {

      onlineUsers.set(
        socket.id,
        username
      );

      io.emit(
        SOCKET_EVENTS.ONLINE_USERS,

        Array.from(
          onlineUsers.values()
        )
      );
    }

    socket.on(SOCKET_EVENTS.JOIN_ROOM, (roomId) => {
        socket.join(roomId);
      }
    );

    socket.on(SOCKET_EVENTS.TYPING, (username) => {
        socket.broadcast.emit(SOCKET_EVENTS.TYPING,
          username
        );
      }
    );
    
    socket.on(SOCKET_EVENTS.STOP_TYPING, () => {
        socket.broadcast.emit(
          SOCKET_EVENTS.STOP_TYPING
        );
      }
    );

    socket.on( SOCKET_EVENTS.SEND_MESSAGE, async (message) => {
        
      try {

          const messagePayload = {
            ...message,
            sender:
              socket.user?.username
              || message.sender,
            createdAt: new Date()
          };

          await publisher.publish(
            REDIS_CHANNELS.CHAT_MESSAGES,
            JSON.stringify(messagePayload)
          );

          await messageQueue.add(
            QUEUE_JOBS.SAVE_MESSAGE,
            messagePayload
          );

        } catch (error) {
          console.error(error.message);
        }
      }
    );

    socket.on(SOCKET_EVENTS.DISCONNECT,() => {
        onlineUsers.delete(socket.id);
        io.emit(SOCKET_EVENTS.ONLINE_USERS,
          Array.from(
            onlineUsers.values()
          )
        );
      }
    );
  });
};