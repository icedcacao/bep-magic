import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "guest",
  },
});

export default model("User", UserSchema);
