import React, { useState } from "react";
import './DropDownButton.scss'

const CustomDropdown = ({ options, placeholder,selectedValue, onSelect, displayKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(null);
  console.log(selectedValue?.name);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    console.log(value);
    onSelect(value);
    // console.log(value);
    // setSelectedValue(value);
    setIsOpen(false);
    // if (onSelect) onSelect(value);
  };

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={handleToggle}>
        {selectedValue?.name || placeholder || "Select an option"}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>&#9662;</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options?.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option[displayKey]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Prop Types
export default CustomDropdown;
