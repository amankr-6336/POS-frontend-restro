import React from 'react'
import './TotalOverview.scss'

function TotalOverview() {
  
  const cards=[
    {name:"Revenue",color:"#008d96"},
    {name:"Total Order",color:"#e96f16"},
    {name:"Average Order Value",color:"#eeb200"},
    {name:"Pending Orders",color:"#575764"}
  ]

  return (
    <div className="total-occupancy-cards">
      {cards.map((item,index)=>
        <div className="overview-box" style={{backgroundColor:`${item.color}`}} key={index}>
          <div className="title">
            <p>{item.name}</p>
          </div>
           <div className="infos">
             <div className="current">
                <p>Rs 5550</p>
             </div>
             <div className="previous">
                <p>+12%</p>
             </div>
           </div>
        </div>
      )}
    </div>
  )
}

export default TotalOverview