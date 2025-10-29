// // const express = require('express') method-1
// import express from "express"; // method-2
// import dotenv from "dotenv";
// import connectDB from "./config/database.js";
// import userRoute from "./routes/userRoute.js";
// import messageRoute from "./routes/messageRoute.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import "./socket/socket.js";
// dotenv.config({});

// const app = express();

// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());
// const corsOption = {
//     origin: 'http://localhost:5173',
//     credentials: true
// };
// app.use(cors(corsOption));

// // Routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/message", messageRoute);

// app.listen(PORT, () => {
//     connectDB();
//     console.log(`Server listening at port ${PORT}`);
// });


import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { setupSocket } from "./socket/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // single HTTP server
const PORT = process.env.PORT || 8080;

// ✅ Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// ✅ Database + Socket + Server start
connectDB();
setupSocket(server); // initializes Socket.io using the same server

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
