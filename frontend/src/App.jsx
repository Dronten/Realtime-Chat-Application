import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from "./redux/userSlice";
import { setSocket } from "./redux/socketSlice";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },

])

function App() {
    const { authUser } = useSelector(store => store.user);
    const { socket } = useSelector(store => store.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authUser) {
            const socketio = io('http://localhost:8080', {
                withCredentials: true,
                transports: ['websocket', 'polling'],
                query: {
                    userId: authUser._id
                }
            });
            dispatch(setSocket(socketio));

            socketio?.on('getOnlineUsers', (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers))
            });
            return () => socketio.close();
        } else {
            if (socket) {
                socket.close();
                dispatch(setSocket(null));
            }
        }
    }, [authUser]);

    return (
        <div className="p-4 h-screen flex items-center justify-center">
            <RouterProvider router={router} />
        </div>
    );
}

export default App
