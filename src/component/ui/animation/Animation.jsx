import React from 'react'
import './Animation.scss'
import d1 from '../../../asset/d1.png'
import d2 from '../../../asset/d2.png'
import d3 from '../../../asset/d3.png'


function Animation() {
  return (
     <div className="circle">
      <div className="part one">
         <img src={d1} alt="" />
      </div>
      <div className="part two">   
         <img src={d2} alt="" />
      </div>
      <div className="part third">
         <img src={d3} alt="" />
      </div>
     </div>
  )
}

export default Animation