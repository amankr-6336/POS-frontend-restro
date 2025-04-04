import React from 'react'
import './Features.scss'
import { IoIosArrowRoundForward } from "react-icons/io";

function Features({data}) {
  return (
    <div className="feature-box">
        <div className="feature-img">
            <img src={data.img} alt="" />
        </div>
        <div className="feature-info">
            <h2>{data.title}</h2>
            <h4>{data.detail}</h4>
            <button>Explore all features <IoIosArrowRoundForward/> </button>
        </div>
    </div>


  )
}

export default Features