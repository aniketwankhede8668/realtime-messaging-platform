import * as messageRepository from "../repositories/messageRepository.js";

export const createMessage = async (payload) => {

  return await messageRepository
    .saveMessage(payload);
};

export const getMessages = async () => {

  return await messageRepository
    .getMessages();
};