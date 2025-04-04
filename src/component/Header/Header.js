import React, { useEffect, useState } from "react";
import "./Header.scss";
import { IoAdd } from "react-icons/io5";
import Button from "../common/button/Button";

function Header({ title, open, setToggle ,dialogContent }) {
  const [dateTime, setDateTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format with AM/PM
  });

  function handleToggle(){
    setToggle(!open)
  }

  return (
    <>
    <div className="header">
      <div className="title">
        <p>{title}</p>
        <div className="add-table-button">
          <Button onClick={()=> setToggle(!open)} type="no-border" size="medium">
            <IoAdd style={{ fontSize: "1rem" }} /> Add New {title}
          </Button>
        </div>
        {/* <AddMenu open={open} setToggle={setToggle}/> */}
      </div>

      <div className="time-date">
        <p>{formattedDate} | {formattedTime}</p>
      </div>
       
    </div>
     {dialogContent}
    </>
  );
}

export default Header;
