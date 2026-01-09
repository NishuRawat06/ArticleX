import express from "express";
import cors from "cors";
import connectDB from "./Config/Database.js";
import ArticleRoute from "./Routes/ArticleRoute.js";
const app = express();
app.use(cors())
app.use(express.json());
connectDB();
app.get("/",(req,res)=>{
    res.send("backend is running");
});
app.use("/api/articles", ArticleRoute);
const PORT=5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});