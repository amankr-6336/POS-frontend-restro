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
import restroLogo from "../../asset/optimized_restaurant_logo.png";
import { ownerInfo } from "../../redux/UserSlice/UserReducer";
import { addNotification } from "../../redux/notificationSlice/NotificationSlice";
import LoadingComponent from "../../component/common/LoadingComponent/LoadingComponent";
import Button from "../../component/common/button/Button";
import FallBack from "../../component/common/fallback/FallBack";
import useApi from "../../hooks/useApi.js";
import { getUserInfo, handleLogoutUser } from "../../services/Auth.api.js";
import { handleCreateRestaurant } from "../../services/Restaurant.api.js";

function Layout() {
  const userInfo = useSelector((state) => state.UserReducer.owner);
  console.log(userInfo);
  const restaurantId = localStorage.getItem("restaurantId");
  const [restroDialog, setRestroDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getOwnerApi = useApi(getUserInfo);
  const logoutUserApi = useApi(handleLogoutUser);
  const addRestaurantApi = useApi(handleCreateRestaurant);

  const notification = useSelector(
    (state) => state.NotificationReducer.notification
  );

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
    setIsLoading(false);
    if (restaurantId) {
      console.log("enetered effefc");
      getUnreadNotification(restaurantId);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (notification.length > 0) {
      getUnreadNotification(restaurantId);
    }
  }, [notification, restaurantId]);

  useEffect(() => {
    const fetchOwnerInfo = async () => {
      try {
        const { success, data } = await getOwnerApi.execute();
        if (success) {
          dispatch(ownerInfo(data?.result));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOwnerInfo();
  }, []);

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
      const { success, data } = await addRestaurantApi.execute({
        name,
        address,
        phone,
      });
      if (success) {
        dispatch(ownerInfo(data.result.ownerInfo));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRestroDialog(false);
    }
  }

  async function handleLogout() {
    try {
      const { success} = await logoutUserApi.execute();
      if (success) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleNotification() {
    setNotificationOpen(!notificationOpen);
    console.log("open");
  }

  if (isLoading || getOwnerApi.loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <div className="main">
        <div className="navigation-menu">
          <div className="logo-section">
            {restaurantId && <img src={restroLogo} alt={restroLogo} />}
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
          {userInfo?.restaurant?._id ? (
            <Outlet />
          ) : (
            <FallBack OnOpen={handleToggleDialog} />
          )}
        </div>
      </div>
      <Dialog
        title="Add Restaurant"
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
