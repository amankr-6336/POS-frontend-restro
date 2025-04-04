import React from "react";
import "./Table.scss";

function Table({ data,selected,onSelect }) {
  const processId = (id) => id?.slice(-5);

  const formattedDate = (createdAt) => {
    if (!createdAt) return ""; // Handle missing or invalid date

    const date = new Date(createdAt); // Convert to a Date object

    const day = date.getUTCDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getUTCMonth()]; // Get month name
    const hours = date.getUTCHours().toString().padStart(2, "0"); // Ensure 2 digits
    const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Ensure 2 digits

    return `${day} ${month} ${hours}:${minutes}`; // Return formatted date
  };

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Table</th>
            <th>OrderId</th>
            <th>UserName</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((data, index) => (
            <tr onClick={()=>onSelect(data)} className={`${data?._id === selected?._id ? "active" : ""}`} key={index}>
              <td>T-{data?.table?.tableNumber}</td>
              <td>#{processId(data?._id)}</td>
              <td>{data?.user}</td>
              <td>{formattedDate(data?.createdAt)}</td>
              <td>₹{data?.totalPrice}</td>
              <td>
                {" "}
                <p className={`${data?.status}`}>{data?.status}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
