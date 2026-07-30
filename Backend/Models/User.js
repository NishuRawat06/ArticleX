import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: String,
    require: false,
    default: null,
  },
});
export default mongoose.model("User", userSchema);
