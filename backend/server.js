import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import { app, server } from "./socketConfig/socket.js";
import path from "path";
import job from "./cron/cron.js";
dotenv.config();
connectDB();
job.start();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

//middlewires
app.use(express.json({ limit: "50mb" }));
app.use(express.json()); // To parse JSON data in the body
app.use(
  express.urlencoded({
    //to parse form data in the req.body
    extended: true,
  })
);
app.use(cookieParser());

//Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
server.listen(PORT, () => {
  console.log(`server started at http:/localhost:${PORT}`);
});
