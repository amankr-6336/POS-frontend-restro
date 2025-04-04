import React from 'react'
import './DashBoardBox.scss'
function DashboardBox({title="Total Overview",content}) {
  return (
    <div className="dashboard-box">
       <div className="box-heading">
         <p>{title}</p>
       </div>
       <div className="box-content">
         {content}
       </div>
    </div>
  )
}

export default DashboardBox