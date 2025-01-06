import React from "react";
import "./Header.scss";
import { IoAdd } from "react-icons/io5";
import Button from "../common/button/Button";

function Header({ title, open, setToggle ,dialogContent }) {
  function handleToggle(){
    setToggle(!open)
  }

  return (
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
        <p>{new Date().toLocaleString()}</p>
      </div>
        {dialogContent}
    </div>
  );
}

export default Header;
