import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

interface InterfaceOfUser {
  gitHubId: string;
  name: string;
  email: string;
  avatar?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

const userSchema = new Schema<InterfaceOfUser>(
  {
    gitHubId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models?.User || model<InterfaceOfUser>("User", userSchema);
export default User;
