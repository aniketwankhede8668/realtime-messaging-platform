import { Worker } from "bullmq";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { QUEUE_NAMES } from "../constants/queue.js";
import Message from "../models/Message.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const worker = new Worker(QUEUE_NAMES.MESSAGE, async (job) => {
    try {
      await Message.create(job.data);
    } catch (error) {
      throw error;
    }
  },

  {
    connection: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
  }
);

worker.on("completed", (job) => {
  console.log(`Job Completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.log(`Job Failed: ${job?.id}`);
  console.error(err.message);
});