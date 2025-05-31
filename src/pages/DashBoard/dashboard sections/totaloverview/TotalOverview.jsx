import React from 'react'
import './TotalOverview.scss'

function TotalOverview({data ,prevdata}) {
  
  // const cards=[
  //   {name:"Revenue",color:"#008d96"},
  //   {name:"Total Order",color:"#e96f16"},
  //   {name:"Average Order Value",color:"#eeb200"},
  //   {name:"Pending Orders",color:"#575764"}
  // ]
  function GetIncremnetOrDecrement(current,prev){
    console.log(current,prev);
    let res;
    if(prev === 0 && current === 0) {
      res = 0;
    } else if (prev === 0) {
      res = 100;
    } else {
      res = ((current - prev) / prev) * 100;
    }
    // return res;
    return `${res}%`
  }

  const cards = [
    { name: "Revenue", value: data?.totalRevenue,percent:GetIncremnetOrDecrement(data?.totalRevenue,prevdata?.totalRevenue) , color: "#008d96" },
    { name: "Total Orders", value: data?.totalOrders,percent:GetIncremnetOrDecrement(data?.totalOrders,prevdata?.totalOrders) ,color: "#e96f16" },
    { name: "Average Order Value", value: data?.averageOrderValue,percent:GetIncremnetOrDecrement(data?.averageOrderValue,prevdata?.averageOrderValue) , color: "#eeb200" },
    { name: "Pending Orders", value: data?.pendingOrders, percent:"", color: "#575764" }
  ];

  return (
    <div className="total-occupancy-cards">
      {cards.map((item,index)=>
        <div className="overview-box" style={{backgroundColor:`${item.color}`}} key={index}>
          <div className="title">
            <p>{item.name}</p>
          </div>
           <div className="infos">
             <div className="current">
                <p>{(item.name==="Revenue"|| item.name==="Average Order Value") ? "Rs":"" } {item.value}</p>
             </div>
             <div className="previous">
                <p>{item.percent}</p>
             </div>
           </div>
        </div>
      )}
    </div>
  )
}

export default TotalOverview