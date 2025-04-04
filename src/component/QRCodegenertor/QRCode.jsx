import React, { useRef, useEffect } from "react";
import { GoDownload } from "react-icons/go";
const QRCodeGenerator = ({ qrCode, restroName, tableNumber }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!qrCode) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas background to white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load QR code image
    const qrImage = new Image();
    qrImage.src = qrCode;
    qrImage.onload = () => {
      // Add Restaurant Name (Left) & Table Number (Right)
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.textAlign = "left";
      ctx.fillText(restroName, 20, 30); // Restaurant Name (Left)

      ctx.textAlign = "right";
      ctx.fillText(`Table ${tableNumber}`, canvas.width - 20, 30); // Table Number (Right)

      // Draw QR Code
      ctx.drawImage(qrImage, 20, 50, 260, 260);

      // Add "Powered by YourWebsite.com" at the bottom
      ctx.fillStyle = "#000";
      ctx.font = "15px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Scan For Menu", canvas.width / 2, 320);

      ctx.fillStyle = "#000";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText("By LocalHost", canvas.width / 2, 350);
    };
  }, [qrCode, restroName, tableNumber]);

  const downloadQR = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `QR_${restroName}_Table${tableNumber}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "0px" }}>
      <canvas ref={canvasRef} width={300} height={370}></canvas>
      <br />
      <button
        onClick={downloadQR}
        style={{
          position:"absolute",
          top:"-34px",
          right:"10px",
          zIndex:"10",
          border:"none",
          fontSize:"15px",
          backgroundColor:"#f5f6f7",
          cursor:"pointer",
         
        }}
      >
        <GoDownload/>
      </button>
    </div>
  );
};

export default QRCodeGenerator;
