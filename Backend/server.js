import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./Config/Database.js";
import ArticleRoute from "./Routes/ArticleRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

console.log("MongoDB state:", mongoose.connection.readyState);

app.use("/api/articles", ArticleRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
