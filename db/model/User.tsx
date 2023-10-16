import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

export interface User {
  name: string;
  email: string;
  image?: string;
  create_at?: string;
  userType?: string;
  admin?: boolean;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  create_at: { type: Date, default: Date.now },
  userType: { type: String },
  admin: { type: Boolean, default: false },
});

const User = models.User || model("User", userSchema);

export default User;
