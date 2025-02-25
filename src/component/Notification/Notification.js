import React, { useEffect } from "react";
import "./Notification.scss";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { GiFireBowl } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { axiosClient } from "../../utils/axiosCLient";
import { markAllAsRead } from "../../redux/notificationSlice/NotificationSlice";

function Notification({ open, onClose, count }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserReducer.owner);
  const restaurantId = userInfo?.restaurant?._id;
  const notification = useSelector(
    (state) => state.NotificationReducer.notification
  );

  const notificationIcon = {
    order: <GiFireBowl />,
    query: <MdOutlineNotificationImportant />,
  };

//   useEffect(() => {
//     if (open) {
//       if(count>0){
//          MarkNotificationAsRead();
//       }
     
//     }
//   }, [open]);

//   async function MarkNotificationAsRead() {
//     try {
//       const response = await axiosClient.post("/notification/mark-allread", {
//         restaurantId: restaurantId,
//       });
//       console.log(response);
   
//     } catch (error) {
//       console.log(error);
//     }
//   }

  return (
    <div className="notification">
      <div className="noti-heading">
        <p>Notifications </p>
        <IoCloseOutline onClick={() => onClose(false)} />
      </div>
      <div className="notice-list">
        {notification?.map((data, index) => (
          <div
            className="notice"
            key={index}
            style={{ backgroundColor: data.isRead === true ? "" : "#f6f6f6" }}
          >
            <div className="icon">{notificationIcon[data.type]}</div>
            <p>{data.message} </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
