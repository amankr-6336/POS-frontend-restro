import React from 'react'
import { IoPeople } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";
import './SingleTableComponent.scss'
function SingleTableComponent({data,onSelect}) {
  return (
     <div onClick={()=>onSelect(data)} className={`single-table-component ${data.status==="available"?"available":"occupied"}`}>
        <div className="table-name">
            <h1>T-{data.tableNumber}</h1>
        </div>
       
        <div className="guests">
            <IoPeople style={{ color: `${data.status==="available"?"#575764":"white"}`}}/> <p>{data?.tableCapacity} People</p>
        </div>
     </div>
  )
}

export default SingleTableComponent