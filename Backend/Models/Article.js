import mongoose from "mongoose";
const ArticleSchema = new mongoose.Schema({
  Author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Article", ArticleSchema);
