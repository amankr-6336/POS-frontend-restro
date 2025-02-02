import React, { useEffect, useState } from "react";
import "./OrderDetail.scss";
import CustomDropdown from "../../../component/common/DropDownButton/DropDownButton";
import RadioButton from "../../../component/common/RadioButton/RadioButton";
import { axiosClient } from "../../../utils/axiosCLient";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../../redux/orderSlice/OrderReducer";
import generateKOTPDF from "../../../component/KotPrint/KotPrint";
import generateBillPDF from "../../../component/BillPrint/BillPrint";
function OrderDetail({ data}) {
  console.log(data);
  const[status,setStatus]=useState();
  const dispatch =useDispatch();

  useEffect(() => {
    if (data?.status) {
      setStatus(data.status);
    }
  }, [data]);

  useEffect(()=>{
    HandleChangeOrderStatus();
  },[status])

   async function HandleChangeOrderStatus(value){
     console.log(data);
    try {
        const response=await axiosClient.post('/order/update-order',{
            orderId:data._id,
            status:status,
            tableId:data.table._id
        })
        console.log(response);
        const updatedOrder = response.result;
        if(response){
          dispatch(updateOrderStatus(updatedOrder));

          // update((prevOrders) => 
          //   prevOrders.map((order) =>
          //     order._id === updatedOrder._id ? { ...order, status: updatedOrder.status } : order
          //   )
          // );
        }
    
      
    } catch (error) {
        console.log(error);
    }
  }

  const RadioOptions = [
    { label: "orderConfirmed", value: "orderConfirmed" },
    { label: "preparing", value: "preparing" },
    { label: "served", value: "served" },
    { label: "paid", value: "paid" },
  ];
  
  const handleChange = (value) => {
    console.log("Selected Value:", value);
    setStatus(value);
  };

  function handleKot(data){
    generateKOTPDF(data);
  }
  function handleBill(data){
    generateBillPDF(data);
    setStatus("paid");
  }
  return (
    <div className="order-detail">
      <div className="table-order-info">
        <h3>Table-{data?.table?.tableNumber}</h3>
        <p>Order #{data?._id.slice(-5)}</p>
      </div>
      <div className="user-info">
        <p>{data?.user}</p>
        <p>{data?.userNumber}</p>
      </div>
      <div className="status">
        <p>Status</p>
        <RadioButton
          options={RadioOptions}
          name="radio"
          selectedValue={status}
          onChange={handleChange}
        />
      </div>
      <div className="items">
        <div className="item-heading">
          <div className="item-name">
            <p>Item</p>
          </div>
          <div className="quantity">
            <p>Quantity</p>
          </div>
          <div className="price">
            <p>Price</p>
          </div>
        </div>
        {data?.items.map((data, index) => (
          <div className="item-body">
            <div className="item-name">
              <p>{data?.menuItem?.name}</p>
            </div>
            <div className="quantity">
              <p>{data?.quantity}</p>
            </div>
            <div className="price">
              <p>{data?.menuItem?.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <h3>Total</h3>
        <h3>₹ {data?.totalPrice}</h3>
      </div>
      <div className="kot-bill-button">
        <button onClick={()=>handleKot(data.kotIds)} style={{ backgroundColor: "#575764" }}>Print KOT</button>
        <button onClick={()=> handleBill(data)} style={{ backgroundColor: "#c0262d" }}>Print Bill</button>
      </div>
    </div>
  );
}

export default OrderDetail;
