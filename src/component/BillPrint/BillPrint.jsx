import { jsPDF } from "jspdf";

function generateBillPDF(billData) {
  if (!billData || !billData.items || !Array.isArray(billData.items)) {
    console.error("Invalid bill data received:", billData);
    return;
  }

  const doc = new jsPDF();
  doc.setFont("helvetica", "normal"); // Fix font encoding
  doc.setFontSize(12);

  const fixEncoding = text => decodeURIComponent(escape(text));

  // Header
  doc.text("RESTAURANT NAME", 20, 20);
  doc.text("----------------------------", 20, 30);
  doc.text(`Order No: #${billData._id}`, 20, 40);
  doc.text(`Table: ${billData.table.tableNumber}`, 20, 50);
  doc.text(`Date: ${new Date(billData.createdAt).toLocaleString()}`, 20, 60);
  doc.text("----------------------------", 20, 70);

  // Items Table
  let y = 80;
  doc.text("Item", 20, y);
  doc.text("Qty", 100, y);
  doc.text("Price", 140, y);
  y += 10;
  doc.text("----------------------------", 20, y);
  y += 10;

  let subtotal = 0;

  billData.items.forEach(item => {
    let itemTotal = item.menuItem.price * item.quantity;
    subtotal += itemTotal;

    doc.text(fixEncoding(item.menuItem.name), 20, y);
    doc.text(String(item.quantity), 100, y);
    doc.text(`₹${item.menuItem.price}`, 140, y);

    y += 10;
  });

  doc.text("----------------------------", 20, y);
  y += 10;

  // Tax & Total
  const taxRate = 0.05; // 5% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 20, y);
  y += 10;
  doc.text(`Tax (5%): ₹${tax.toFixed(2)}`, 20, y);
  y += 10;
  doc.text(`Total: ₹${total.toFixed(2)}`, 20, y);
  y += 10;
  doc.text("----------------------------", 20, y);
  y += 10;

  // Footer
  doc.text("Thank You! Visit Again.", 20, y);

  // Save & Print
  doc.save(`Bill_${billData._id}.pdf`);
}

export default generateBillPDF