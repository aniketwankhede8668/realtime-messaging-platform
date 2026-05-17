import * as messageService from "../services/messageService.js";

export const createMessage =
  async (req, res, next) => {
    try {
      const message = await messageService .createMessage(req.body);
      res.status(201).json(message);
    } catch(error) {
      next(error);
    }
};

export const getMessages =
  async (req, res, next) => {
    try {
      const messages = await messageService.getMessages();
      res.status(200).json(messages.reverse());
    } catch (error) {
      next(error);
    }
};