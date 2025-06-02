import { useEffect, useState } from "react";
import { requestPermission, onMessageListener } from "../utils/firebase";
import { useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosCLient";

export const useNotifications = () => {
  const [token, setToken] = useState("");
  const userInfo = useSelector((state) => state.UserReducer.owner);

  useEffect(() => {
    const shouldRegister = "Notification" in window && "serviceWorker" in navigator;

    const registerToken = async () => {
      try {
        const fcmToken = await requestPermission();
        if (!fcmToken || !userInfo?._id) return; // wait until both are available

        setToken(fcmToken);

        await axiosClient.post("/owner/setToken", {
          token: fcmToken,
          userId: userInfo._id,
        });
      } catch (error) {
        console.error("Error registering token:", error);
      }
    };

    if (shouldRegister && userInfo?._id) {
      registerToken();

      onMessageListener()
        .then((payload) => {
          const { title, body } = payload.notification;
          new Notification(title, {
            body,
            icon: "/logo.png",
          });
        })
        .catch((err) => console.log("Message listener error", err));
    }
  }, [userInfo?._id]);

  return token;
};
