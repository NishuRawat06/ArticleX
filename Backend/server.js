import "dotenv/config";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./Config/Database.js";
import ArticleRoute from "./Routes/ArticleRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
  }),
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(cookieParser());
await connectDB();

console.log("MongoDB state:", mongoose.connection.readyState);

app.use("/api/articles", ArticleRoute);
app.use("/api/auth", UserRoute);
const port = Number(process.env.SERVER_PORT || 3000);
app.listen(port, async () => {
  console.log("Server running on http://localhost:" + port);
});
