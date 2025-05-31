import React, { useEffect, useState } from "react";
import "./DashBoard.scss";
import Header from "../../component/Header/Header";
import DashboardBox from "../../component/dashboard section box/DashboardBox";
import TotalOverview from "./dashboard sections/totaloverview/TotalOverview";
import OccupancyLineChart from "./dashboard sections/occupancy rate/OccupancyChart";
import TopDishesPieChart from "./dashboard sections/topdishes/TopDishChart";
import { axiosClient } from "../../utils/axiosCLient";
import CustomDropdown from "../../component/common/DropDownButton/DropDownButton";
import { useSelector } from "react-redux";
import LoadingComponent from "../../component/common/LoadingComponent/LoadingComponent";
import { io } from "socket.io-client";


const socket = io("http://localhost:4001", { autoConnect: false });


function DashBoard() {
  const options = [
    { name: "Today", value: "daily" },
    { name: "Last Week", value: "weekly" },
    { name: "Last Month", value: "monthly" },
  ];
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const userInfo = useSelector((state) => state.UserReducer.owner);
  const restaurantId = localStorage.getItem("restaurantId");


  useEffect(() => {
    // Only connect socket if restaurantId is available
    if (!restaurantId) return;
  
    // Connect to the socket server
    socket.connect();
  
    // Once connected, join the room for the specific restaurantId
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
  
      // Join the room
      socket.emit('joinRoom', { restaurantId });
    });
  
    // Listen for the 'dashboardData' event
    socket.on('dashboardData', (data) => {
      console.log("Received dashboard data:", data);
      setData(data); // Update your state with the received data
    });
  
    // Cleanup the socket on component unmount
    return () => {
      socket.off('dashboardData'); // Remove the 'dashboardData' listener
      socket.disconnect(); // Optionally disconnect the socket if needed
    };
  }, [restaurantId])

  
  useEffect(() => {
    setLoading(true);
    getData(selectedValue.value);
  }, [selectedValue]);

  async function getData(filter) {
    try {
      const response = await axiosClient.get("/dashboard/get-dashboard", {
        params: { filter: filter, restaurantId: restaurantId },
      });
      setData(response.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard">
      <div className="top-section">
        <Header
          title={"Dashboard"}
          filter={true}
          filterContent={
            <CustomDropdown
              options={options}
              placeholder="Select report type"
              selectedValue={selectedValue}
              onSelect={setSelectedValue}
              displayKey="name"
            />
          }
        />
      </div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="bottom-section">
          <div className="first-row">
            <div className="total-overview">
              <DashboardBox
                title="Total Overview"
                content={
                  <TotalOverview
                    data={data?.orders}
                    prevdata={data?.prevOrder}
                  />
                }
              />
            </div>

            <div className="occupancy-rate">
              <DashboardBox
                title="Occupancy Rate"
                content={<OccupancyLineChart data={data?.Occupancy} />}
              />
            </div>
          </div>
          <div className="second-row">
            <div className="top-dishes">
              <DashboardBox
                title="Trending Orders"
                content={<TopDishesPieChart data={data?.orders?.topDishes} />}
              />
            </div>
            <div className="top-category">
              <DashboardBox
                title="Trending Category"
                content={
                  <TopDishesPieChart data={data?.orders?.topCategories} />
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
