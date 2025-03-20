import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

interface ChatMessage {
  role: "user" | "gpt";
  content: string;
  timestamp?: Date;
}

interface InterfaceOfChat {
  userId: mongoose.Types.ObjectId;
  messages: ChatMessage[];
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const chatSchema = new Schema<InterfaceOfChat>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        role: { type: String, enum: ["user", "gpt"], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    title: {
      type: String,
      default: "New Chat",
    },
  },
  { timestamps: true }
);

const Chat = models?.Chat || model<InterfaceOfChat>("Chat", chatSchema);
export default Chat;
