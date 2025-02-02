import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Table from "./pages/Tables/Table";
import Menu from "./pages/Menu/Menu";
import Order from "./pages/Order/Order";
import Login from "./pages/login/Login";
import SignUp from "./pages/singup/SignUp";
import RequireUser from "./utils/RequireUser";
import OnlyifNotLoggedIn from "./utils/OnlyifNotLoggedIn";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { addOrder } from "./redux/orderSlice/OrderReducer";
import bellSound from "./asset/warning-notification-call-184996.mp3";

const socket = io("http://localhost:4001", { autoConnect: false });

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserReducer.owner);
  const restaurantId = userInfo?.restaurant?._id;

  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    // Only connect socket if restaurantId is available
    if (!restaurantId) return;

    socket.connect();
    setIsSocketConnected(true);

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
      socket.emit("joinRoom", { restaurantId });
    });

    socket.on("newOrder", (order) => {
      console.log("New order received:", order);

      // Play bell sound
      const audio = new Audio(bellSound);
      audio.play().catch((error) => console.error("Audio play error:", error));

      // Dispatch new order to Redux
      dispatch(addOrder(order.order));
    });

    return () => {
      socket.disconnect();
      setIsSocketConnected(false);
    };
  }, [restaurantId, dispatch]); // Runs only when restaurantId is available

  return (
    <Routes element={<RequireUser />}>
      <Route path="/" element={<Layout />}>
        <Route path="table" element={<Table />} />
        <Route path="menu" element={<Menu />} />
        <Route path="order" element={<Order />} />
        <Route path="report" />
        <Route path="notification" />
        <Route path="setting" />
      </Route>
      <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
