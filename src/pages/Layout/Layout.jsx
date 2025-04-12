import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
// icons
import { PiPicnicTableBold } from "react-icons/pi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { MdAnalytics } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
// imports
import "./Layout.scss";
import { axiosClient } from "../../utils/axiosCLient";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../../component/common/dialog/Dialog";
import Input from "../../component/common/input/Input";
import Notification from "../../component/Notification/Notification";
import restroLogo from '../../asset/optimized_restaurant_logo.png'
import { ownerInfo } from "../../redux/UserSlice/UserReducer";

function Layout() {
  const userInfo = useSelector((state) => state.UserReducer.owner);
  const restaurantId = userInfo?.restaurant?._id;
  const [restroDialog, setRestroDialog] = useState(false);
  const [isLoading,setIsLoading]=useState(true);
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const navigate = useNavigate();
  const dispatch=useDispatch();


  const notification = useSelector(
    (state) => state.NotificationReducer.notification
  );
  console.log(restaurantId);

  const navigationOptions = [
    {
      name: "Tables",
      icon: <PiPicnicTableBold />,
      path: "table",
    },
    {
      name: "Menu",
      icon: <MdOutlineRestaurantMenu />,
      path: "menu",
    },
    {
      name: "Orders",
      icon: <CgNotes />,
      path: "order",
    },
    {
      name: "Report",
      icon: <MdAnalytics />,
      path: "report",
    },
    {
      name: "Settings",
      icon: <IoIosSettings />,
      path: "setting",
    },
  ];

  useEffect(() => {
    console.log(restaurantId);
    setIsLoading(false)
    if (restaurantId) {
      console.log("enetered effefc");
      getUnreadNotification(restaurantId);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (notification.length > 0) {
      getUnreadNotification(restaurantId);
    }
  }, [notification,restaurantId]);

  async function getUnreadNotification(restaurantId) {
    try {
      const response = await axiosClient.get(
        "/notification/get-unread-count/",
        {
          params: { restaurantId },
        }
      );

      if (response) {
        console.log(response.data, "from count");
        setUnreadNotificationCount(response?.result?.unreadCount);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleToggleDialog() {
    setRestroDialog(!restroDialog);
  }

  async function handleAddrestaurant() {
    try {
      const response = await axiosClient.post("/restaurant/create-restro", {
        name,
        address,
        phone,
      });
      console.log(response);
      if(response){
        const response = await axiosClient.get("/owner/getownerinfo");
        dispatch(ownerInfo(response.result));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRestroDialog(false);
    }
  }

  async function handleLogout() {
    try {
      // dispatch(setLoading(true));
      await axiosClient.post("/auth/logout");
      localStorage.removeItem("accessToken");
      navigate("/login");
      // dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  }

  function handleNotification() {
    setNotificationOpen(!notificationOpen);
    console.log("open");
  }

  return (
    <>
      <div className="main">
        <div className="navigation-menu">
          <div className="logo-section">
            {userInfo?.restaurant?.name && <img src={restroLogo} alt={restroLogo} /> }
          </div>

          <div className="menu">
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {navigationOptions.map((item, index) => (
                <li
                  key={index}
                  onClick={
                    item.name === "notice" ? handleNotification : undefined
                  }
                >
                  <NavLink
                    to={item?.path}
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: isActive ? "blue" : "black",
                      backgroundColor: isActive ? "#43434e" : "",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "0px",
                      padding: "8px",
                    })}
                  >
                    <span>{item.icon}</span>
                    <p>{item.name}</p>
                  </NavLink>
                </li>
              ))}
              <li
                onClick={handleNotification}
                style={{ padding: "8px", marginTop: "0px", cursor: "pointer" }}
              >
                <span>
                  <IoMdNotifications />
                  <p>{unreadNotificationCount}</p>
                </span>
                <p>Notice</p>
              </li>
            </ul>
          </div>
          <div className="logout">
            <CiLogout onClick={handleLogout} />
          </div>

          {notificationOpen && (
            <Notification
              open={notificationOpen}
              onClose={setNotificationOpen}
              count={unreadNotificationCount}
              setCount={setUnreadNotificationCount}
            />
          )}
        </div>

        <div className="main-layout">
          {isLoading ? (
            <p className="prompt-message">Loading...</p> // Show a loading message instead of the prompt
          ) : restaurantId ? (
            <Outlet />
          ) : (
            <div className="prompt-message">
              <p onClick={() => setRestroDialog(true)}>
                Add Restro to use Dashboard
              </p>
            </div>
          )}
        </div>
      </div>
      <Dialog
        title="Add Menu"
        isOpen={restroDialog}
        onClose={handleToggleDialog}
        confirm={{ text: "Add Restaurant", onConfirm: handleAddrestaurant }}
      >
        <Input
          label="Restaurant Name"
          name="name"
          value={name}
          onChange={setName}
        />

        <Input
          label="Address"
          name="Address"
          value={address}
          onChange={setaddress}
        />
        <Input label="Phone" name="Phone" value={phone} onChange={setPhone} />
      </Dialog>
    </>
  );
}

export default Layout;
