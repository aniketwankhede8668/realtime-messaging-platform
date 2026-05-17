import Message from "../models/Message.js";

export const saveMessage = async (data) => {
  return await Message.create(data);
};

export const getMessages = async () => {
  return await Message.find()
    .sort({ createdAt: -1 })
    .limit(50);
};