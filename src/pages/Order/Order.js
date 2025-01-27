import React, { useEffect, useState } from 'react'
import './Order.scss'
import Header from '../../component/Header/Header'
import AddMenu from '../Menu/addMenu/AddMenu';
import { axiosClient } from '../../utils/axiosCLient';
import axios from 'axios';
import Table from '../../component/common/table/Table';
import { data } from 'react-router-dom';
import OrderDetail from './OrderDetail/OrderDetail';
import { io } from 'socket.io-client';
function Order() {

  // const socket=io("http://localhost:4001");
  const [socket, setSocket] = useState(null);
  const [orderDialog,setOrderDialog]=useState(false);
  const [orders,setOrder]=useState([]);
  const [selected,setSelected]=useState(null);

  // socket.on("newOrder", (order) => {
  //   console.log("New order received:", order);
  //   // Update UI with the new order
  // });

  // useEffect(() => {
  //   const socketInstance = io("http://localhost:4001");
  //   setSocket(socketInstance);
    
  //   socketInstance.emit("joinRoom", { restaurantId: "6766eecdfae318648d9368ee" });
  //   // Listen for new orders
  //   socketInstance.on("newOrder", (order) => {
  //     console.log("New order received:", order);
  //     setOrder((prevOrders) => [order.order, ...prevOrders]); // Add new order to the list
  //   });
  
  //   return () => {
  //     socketInstance.disconnect(); // Cleanup on unmount
  //   };
  // }, []);
  const restaurantId="6766eecdfae318648d9368ee"

  useEffect(() => {
    const socket = io("http://localhost:4001");

    const joinRoom = () => {
      socket.emit("joinRoom", { restaurantId });
      console.log(`Joined room: ${restaurantId}`);
    };

    // Initial connection
    socket.on("connect", () => {
      console.log("Connected to socket server:", socket.id);
      joinRoom();
    });

    // Reconnection handling
    socket.on("reconnect", () => {
      console.log("Reconnected to socket server:", socket.id);
      joinRoom(); // Rejoin the room after reconnection
    });

    // Listen for new orders
    socket.on("newOrder", (order) => {
      console.log("New order received:", order);
      setOrder((prevOrders) => [order.order, ...prevOrders]); // Add new order to the list
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [restaurantId]);

  useEffect(()=>{
    handleGetOrder();
  },[])

  async function handleGetOrder(){
       try {
        const response=await axiosClient.get('/order/get-order',{
          params:{restaurantId:"6766eecdfae318648d9368ee"}
        })
        console.log(response?.data?.result);
        setOrder(response?.data?.result);
        setSelected(response?.data?.result[0]);
       } catch (error) {
        console.log(error);
       }
  }

  return (
    <div className="order">
    <div className="top-section">
      <Header
        title={"Order"}
        open={orderDialog}
        setToggle={setOrderDialog}
        dialogContent={
          orderDialog && (
            <AddMenu
            //   open={menuDialog}
            //   setToggle={HandletoggleMenudialog}
            //   update={getMenuForCategory}
            />
          )
        }
      />
    </div>
    <div className="bottom-section">
      <div className="listing-section">
         <div className="order-table">
              <Table data={orders} selected={selected} onSelect={setSelected} />
         </div>
       
      </div>
      <div className="detail-view">
          <OrderDetail data={selected}/>
      </div>
    </div>
  </div>
  )
}

export default Order