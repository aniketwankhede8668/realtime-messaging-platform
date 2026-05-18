import { Queue } from "bullmq";
import dotenv from "dotenv";

import { QUEUE_NAMES } from "../constants/queue.js";

dotenv.config();

export const messageQueue = new Queue(
  QUEUE_NAMES.MESSAGE,

  {
    connection: {
      url: process.env.REDIS_URL
    }
  }
);