import React, { useEffect, useState } from "react";
import "./Order.scss";
import Header from "../../component/Header/Header";
import AddMenu from "../Menu/addMenu/AddMenu";
// import axios from 'axios';
import Table from "../../component/common/table/Table";
// import { data } from 'react-router-dom';
import OrderDetail from "./OrderDetail/OrderDetail";
// import { io } from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
// import bellSound from '../../asset/warning-notification-call-184996.mp3'
import { setOrders } from "../../redux/orderSlice/OrderReducer";
import EmptyState from "../../component/emptystate/EmptyState";
import useApi from "../../hooks/useApi";
import { handlegetOrders } from "../../services/Order.api";

function Order() {
  const [orderDialog, setOrderDialog] = useState(false);
  const [orders, setOrder] = useState();
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserReducer.owner);
  const OrdersList = useSelector((state) => state.OrderReducer.orders);
  console.log(OrdersList);

  const getOrdersApi=useApi(handlegetOrders);

  useEffect(() => {
    handleGetOrder();
  }, []);

  async function handleGetOrder() {
    try {
      const {data}=await getOrdersApi.execute({ restaurantId: userInfo.restaurant._id })
      console.log(data);
      dispatch(setOrders(data?.result));
      setSelected(data?.result[0]);
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
      {OrdersList?.length > 0 ? (
        <div className="bottom-section">
          <div className="listing-section">
            <div className="order-table">
              <Table
                data={OrdersList}
                selected={selected}
                onSelect={setSelected}
              />
            </div>
          </div>
          <div className="detail-view">
            <OrderDetail order={orders} update={setOrder} data={selected} />
          </div>
        </div>
      ) : (
        <EmptyState boldtext="No orders Yet!!!" />
      )}
    </div>
  );
}

export default Order;
