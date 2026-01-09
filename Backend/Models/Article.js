import mongoose from "mongoose";
const ArticleSchema = new mongoose.Schema({
  Author: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    require: true,
  },
});
export default mongoose.model("Article", ArticleSchema);
