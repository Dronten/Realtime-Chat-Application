import { Server } from "socket.io";
const userSocketMap = {}; // {userId: socketId}

let io;
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

export const setupSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
<<<<<<< HEAD
=======
        console.log("user connected:", socket.id);
>>>>>>> 1841cea85059c66d37800ad30ce467e510cf9d06

        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap[userId] = socket.id;
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
<<<<<<< HEAD
=======
            console.log("user disconnected:", socket.id);
>>>>>>> 1841cea85059c66d37800ad30ce467e510cf9d06
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });
};
export { io, userSocketMap };

