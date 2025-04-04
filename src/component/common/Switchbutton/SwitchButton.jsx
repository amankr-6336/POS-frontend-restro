import React, { useState } from 'react';

const StockSwitch = ({Stock,setStock,update}) => {
   console.log(Stock);

  const toggleStock = () => {
    console.log("Before Toggle:", Stock);
    const newStockValue = !Stock;
    setStock(newStockValue);
    console.log("After Toggle:", newStockValue);
   
  };

  return (
    <div style={styles.container}>
      <label style={styles.switch}>
        <input
          type="checkbox"
          checked={Stock}
          onChange={toggleStock}
          style={styles.input}
        />
        <span
          style={{
            ...styles.slider,
            backgroundColor: Stock ? '#4CAF50' : '#ccc',
          }}
        >
          <span
            style={{
              ...styles.sliderBefore,
              transform: Stock ? 'translateX(20px)' : 'translateX(0)',
            }}
          ></span>
        </span>
      </label>
      <p style={styles.text}>{Stock ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '40px',
    height: '18px',
  },
  input: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '24px',
    transition: 'background-color 0.4s',
  },
  sliderBefore: {
    position: 'absolute',
    content: '""',
    height: '10px',
    width: '10px',
    left: '4px',
    bottom: '4px',
    backgroundColor: 'white',
    transition: 'transform 0.4s',
    borderRadius: '50%',
  },
  text: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color:"#575764"
  },
};

export default StockSwitch;
