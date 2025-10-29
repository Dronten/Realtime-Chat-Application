// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: ['http://localhost:5173'],
//         methods: ['GET', 'POST'],
//     },
// });
// const userSocketMap = {}; // {userId: socketId}


// io.on('connection', (socket) => {
//     console.log('user connected', socket.id);

//     const userId = socket.handshake.query.userId;
//     if (userId !== undefined) {
//         userSocketMap[userId] = socket.id;
//     }

//     io.emit('getOnlineUsers', Object.keys(userSocketMap));

//     socket.on('disconnect', () => {
//         console.log('user disconnected', socket.id);
//         delete userSocketMap[userId];
//         io.emit('getOnlineUsers', Object.keys(userSocketMap));
//     })

// })
// // server.listen(8080, () => {
// //     console.log("Server running on port 8080");
// // });


// // export { app, io, server };

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
        console.log("✅ user connected:", socket.id);

        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap[userId] = socket.id;
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            console.log("❌ user disconnected:", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });
};
export { io, userSocketMap };

