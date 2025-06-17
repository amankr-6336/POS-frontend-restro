import React from 'react';

function Dot({ color = 'red', size = 8, top = '0%', left = '0%' }) {
  return (
    <div
      className="dot"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        position: 'absolute',
        top: top,
        left: left,
        borderRadius: '50%',
      }}
    ></div>
  );
}

export default Dot;
