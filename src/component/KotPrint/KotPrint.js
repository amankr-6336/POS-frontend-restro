import { jsPDF } from "jspdf";

function generateKOTPDFs(kotIds) {
  kotIds.forEach(kotData => {
    const doc = new jsPDF();
    doc.setFont("courier");

    // Header
    doc.text("RESTAURANT NAME", 20, 20);
    doc.text("----------------------------", 20, 30);
    doc.text(`Category: ${kotData.category}`, 20, 40);
    doc.text(`Order No: #${kotData.order}`, 20, 50);
    doc.text(`Table: ${kotData.table}`, 20, 60);
    doc.text(`Date: ${new Date(kotData.createdAt).toLocaleString()}`, 20, 70);
    doc.text("----------------------------", 20, 80);

    // Items
    let y = 90;
    doc.text("Item               Qty", 20, y);
    y += 10;
    doc.text("----------------------------", 20, y);
    y += 10;

    kotData.items.forEach(item => {
      doc.text(`${item.menuItem.name.padEnd(20)} ${item.quantity}`, 20, y);
      y += 10;
    });

    doc.text("----------------------------", 20, y);
    y += 10;

    // Save and Print
    doc.save(`KOT_${kotData.category}_${kotData._id}.pdf`);
  });
}
 export default generateKOTPDFs