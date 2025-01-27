import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
// icons
import { PiPicnicTableBold } from "react-icons/pi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { MdAnalytics } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
// imports
import "./Layout.scss";
import { axiosClient } from "../../utils/axiosCLient";
import { useDispatch, useSelector } from "react-redux";
import { ownerInfo } from "../../redux/UserSlice/UserReducer";
import Dialog from "../../component/common/dialog/Dialog";
import Input from "../../component/common/input/Input";

function Layout() {
  const [restroDialog, setRestroDialog] = useState(false);
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserReducer.owner);
  console.log(userInfo);

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
      name: "Notice",
      icon: <IoMdNotifications />,
      path: "notification",
    },
    {
      name: "Settings",
      icon: <IoIosSettings />,
      path: "setting",
    },
  ];

  useEffect(() => {
    getOwnerInfo();
  }, [dispatch]);

  async function getOwnerInfo() {
    try {
      const response = await axiosClient.get("/owner/getownerinfo");
      console.log(response);

      if (response) {
        dispatch(ownerInfo(response.result));
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="main">
        <div className="navigation-menu">
          <div className="logo-section">
             {userInfo.restaurant && <p>Restro</p> }
          </div>

          <div className="menu">
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {navigationOptions.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
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
            </ul>
          </div>
        </div>

        <div className="main-layout">
          {userInfo.restaurant ? (
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
