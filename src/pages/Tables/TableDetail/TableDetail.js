import React from "react";
import "./TableDetail.scss";
import QRCodeGenerator from "../../../component/QRCodegenertor/QRCode";

function TableDetail({ data }) {
  console.log(data);
  return (
    <div className="tableDetail">
      <div className="table-number">
        <h3>Table -{data?.tableNumber}</h3>
      </div>
      <div className="qr-code">
        {/* <img src={data?.qrCode} alt="" /> */}
        <QRCodeGenerator
          qrCode={data?.qrCode} // Your QR Code Base64
          restroName="The Gourmet Bistro"
          tableNumber={data?.tableNumber} 
        />
      </div>
      {/* <div className="other-detail">
        <p>Status : </p>
        <p style={{color:`${data.status==="occupied"? "#eeb200":"#e5e6e7"}`}}>{data?.status[0].toUpperCase()+data?.status.slice(1)}</p>
      </div> */}
    </div>
  );
}

export default TableDetail;
