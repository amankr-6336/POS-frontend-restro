import { Router, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Table from "./pages/Tables/Table";
import Menu from "./pages/Menu/Menu";
import Order from "./pages/Order/Order";
import Login from "./pages/login/Login";
import SignUp from "./pages/singup/SignUp";
import RequireUser from "./utils/RequireUser";
// import OnlyifNotLoggedIn from "./utils/OnlyifNotLoggedIn";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { addOrder } from "./redux/orderSlice/OrderReducer";
import bellSound from "./asset/warning-notification-call-184996.mp3";
import notificationSound from "./asset/mixkit-correct-answer-tone-2870 (1).wav";
// import Notification from "./component/Notification/Notification";
import { addNotification } from "./redux/notificationSlice/NotificationSlice";
import { axiosClient } from "./utils/axiosCLient";
import { ownerInfo } from "./redux/UserSlice/UserReducer";
import DashBoard from "./pages/DashBoard/DashBoard";
import LandingPage from "./pages/LandingPage/LandingPage";
import Setting from "./pages/Setting/Setting";
import ClipLoader from "react-spinners/ClipLoader";

const socket = io("http://localhost:4001", { autoConnect: false });

function App() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const userInfo = useSelector((state) => state.UserReducer.owner);
  const restaurantId = userInfo?.restaurant?._id;

  const [isSocketConnected, setIsSocketConnected] = useState(false);
  console.log(isSocketConnected);

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
      dispatch(addOrder(order));
    });

    socket.on("newOrderNotification", (notification) => {
      console.log(`Notification for Restaurant ${restaurantId}:`, notification);
      setTimeout(() => {
        const audio = new Audio(notificationSound);
        audio
          .play()
          .catch((error) => console.error("Audio play error:", error));
      }, 200);
      dispatch(addNotification(notification));
    });

    return () => {
      socket.disconnect();
      setIsSocketConnected(false);
    };
  }, [restaurantId, dispatch]); // Runs only when restaurantId is available

  useEffect(() => {
    if (token) {
      console.log("token there ");
      Navigate("/dashboard/setting");
    }
    getOwnerInfo();
  }, [token]);

  async function getOwnerInfo() {
    try {
      const response = await axiosClient.get("/owner/getownerinfo");
      console.log(response);

      if (response) {
        dispatch(ownerInfo(response.result));
      }
      if (response.result.restaurant) {
        const restaurantId = response.result.restaurant._id;
        getNotification(restaurantId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getNotification(restaurantId) {
    try {
      const response = await axiosClient.get("/notification/get-notice", {
        params: { restaurantId },
      });
      console.log(response);
      if (response) {
        dispatch(addNotification(response.result));
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return (
      <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <ClipLoader color="#4F46E5" size={50} />
      </div>
    );
  }

  return (
    <Routes>
      {/* Unprotected Landing Page Route */}
      {/* <Route path="/" element={<LandingPage />} /> */}
      <Route path="/" element={<LandingPage />} />

      {/* Authentication Routes (Unprotected) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route element={<RequireUser />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route path="table" element={<Table />} />
          <Route path="menu" element={<Menu />} />
          <Route path="order" element={<Order />} />
          <Route path="report" element={<DashBoard />} />
          <Route path="setting" element={<Setting />} /> {/* Placeholder */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
