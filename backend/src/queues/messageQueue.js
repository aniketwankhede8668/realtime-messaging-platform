import { Queue } from "bullmq";
import dotenv from "dotenv";

import { QUEUE_NAMES } from "../constants/queue.js";

dotenv.config();

export const messageQueue = new Queue(
  QUEUE_NAMES.MESSAGE,

  {
    connection: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
  }
);