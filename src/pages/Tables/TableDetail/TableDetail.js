import React from 'react'
import './TableDetail.scss'

function TableDetail({data}) {
    console.log(data);
  return (
    <div className="tableDetail">
        <div className="table-number">
            <h2>Table -0{data?.tableNumber}</h2>
        </div>
        <div className="qr-code">
            <img src={data?.qrCode} alt="" />
        </div>
        <div className="other-detail">
              <p>Status : {data?.status}</p>
        </div>
    </div>
  )
}

export default TableDetail