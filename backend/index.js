import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { setupSocket } from "./socket/socket.js";
import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

const _dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Database + Socket + Server start
connectDB();
setupSocket(server); // initializes Socket.io using the same server

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get("/*splat", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
