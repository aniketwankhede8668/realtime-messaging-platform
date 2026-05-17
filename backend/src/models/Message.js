import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  roomId: String,
  sender: String,
  text: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Message", MessageSchema);