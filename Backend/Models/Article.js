import mongoose from "mongoose";
const ArticleSchema = new mongoose.Schema({
  Author: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  Author_id: {
    type: String,
    require: true,
  },
});
export default mongoose.model("Article", ArticleSchema);
