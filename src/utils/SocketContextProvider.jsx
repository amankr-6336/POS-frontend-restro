import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SocketContext from "./SocketContext.js";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const userInfo = useSelector((state) => state.UserReducer.owner);
  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    const newSocket = io("http://localhost:4001", { autoConnect: false });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected.");
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    if (restaurantId) {
      socket.connect();

      socket.on("connect", () => {
        console.log("Connected to socket:", socket.id);
        socket.emit("joinRoom", { restaurantId });
      });

      return () => {
        socket.off("connect");
        console.log("Socket event 'connect' off");
      };
    }
  }, [socket, restaurantId]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
