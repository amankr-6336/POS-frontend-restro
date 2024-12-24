import React from "react";
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

function Layout() {
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

  return (
    <div className="main">
      <div className="navigation-menu">
        <div className="logo-section">
          <img src="" alt="" />
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
                    backgroundColor:isActive?"#43434e":"",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap:"0px",
                    padding:"8px"
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
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
