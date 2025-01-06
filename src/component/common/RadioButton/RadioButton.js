import React from "react";
import './RadioButton.scss'

const RadioButton = ({ options, name, selectedValue, onChange }) => {
  return (
    <div className="radio-button-group">
      {options.map((option, index) => (
        <label key={index} className="radio-button">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="radio-label">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

// Prop Types


export default RadioButton;
