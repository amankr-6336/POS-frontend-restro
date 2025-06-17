import React from 'react'
import './DishCircle.scss'

function DishCircle({img,left,top}) {
  return (
    <div className="doted-circle"  style={{position:"absolute",left:left,top:top}}>
        <img src={img} alt="" />
    </div>
  )
}

export default DishCircle