// NotificationComponent.jsx
import React, { useState, useEffect } from "react";
import { requestPermission, onMessageListener } from "../utils/firebase.js";
import axios from "axios";
import { axiosClient } from "../utils/axiosCLient.jsx";
import { useSelector } from "react-redux";


const NotificationComponent = () => {
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const userInfo = useSelector((state) => state.UserReducer.owner);
  console.log(userInfo);

  useEffect(() => {
    // Check if notifications are supported
    if ("Notification" in window && "serviceWorker" in navigator) {
      setIsSupported(true);
    }

    // Request permission and get token
    const getToken = async () => {
      const fcmToken = await requestPermission();
      if (fcmToken) {
        setToken(fcmToken);
        // Send token to your backend
        await sendTokenToServer(fcmToken);
      }
    };

    if (isSupported) {
      getToken();
    }

    // Listen for foreground messages
    onMessageListener()
      .then((payload) => {
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      })
      .catch((error) => console.log("Failed to receive message:", error));
  }, [isSupported]);

  const sendTokenToServer = async (token) => {
    try {
      //   await axios.post('/api/notifications/register', {
      //     token,
      //     userId: 'current-user-id' // Replace with actual user ID
      //   });

      const res = await axiosClient.post("/owner/setToken", {
        token,
        userId:userInfo._id
      });
      if (res) {
        console.log("Token sent to server successfully");
      }
    } catch (error) {
      console.error("Error sending token to server:", error);
    }
  };

  const sendTestNotification = async () => {
    try {
      await axios.post("/api/notifications/send", {
        title: "Test Notification",
        body: "This is a test notification from your MERN app!",
        userId: "current-user-id", // Replace with actual user ID
      });
      console.log("Test notification sent");
    } catch (error) {
      console.error("Error sending test notification:", error);
    }
  };

  if (!isSupported) {
    return (
      <div className="notification-component">
        <p>Push notifications are not supported in this browser.</p>
      </div>
    );
  }

  return (
    <div className="notification-component">
      <h3>Push Notifications</h3>

      {token ? (
        <div>
          <p style={{ color: "green" }}>✅ Notifications enabled</p>
          <button onClick={sendTestNotification}>Send Test Notification</button>
        </div>
      ) : (
        <p style={{ color: "orange" }}>⚠️ Please enable notifications</p>
      )}

      {notification && (
        <div
          style={{
            background: "#f0f0f0",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
          }}
        >
          <h4>{notification.title}</h4>
          <p>{notification.body}</p>
          <button onClick={() => setNotification(null)}>Dismiss</button>
        </div>
      )}

      <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        <p>FCM Token (first 50 chars): {token.substring(0, 50)}...</p>
      </div>
    </div>
  );
};

export default NotificationComponent;
