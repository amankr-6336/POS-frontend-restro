import React, { useEffect } from "react";
import "./DashBoard.scss";
import Header from "../../component/Header/Header";
import DashboardBox from "../../component/dashboard section box/DashboardBox";
import TotalOverview from "./dashboard sections/totaloverview/TotalOverview";
import OccupancyLineChart from "./dashboard sections/occupancy rate/OccupancyChart";
import TopDishesPieChart from "./dashboard sections/topdishes/TopDishChart";
import { axiosClient } from "../../utils/axiosCLient";
import axios from "axios";

function DashBoard() {
  
  const dishData = [
    { dish: "Pizza", orders: 120 },
    { dish: "Burger", orders: 90 },
    { dish: "Pasta", orders: 80 },
    { dish: "Sushi", orders: 70 },
    { dish: "Salad", orders: 60 },
  ];
  const categoryData = [
    { category: "Beverages", orders: 150 },
    { category: "Fast Food", orders: 120 },
    { category: "Desserts", orders: 100 },
    { category: "Main Course", orders: 90 },
    { category: "Salads", orders: 80 },
  ];

  useEffect(()=>{
    getData();
  },[]);

  async function getData() {
    try {
      const response=await axiosClient.get('/dashboard/get-dashboard',{
        params:{filter:"daily"}
      })
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className="dashboard">
      <div className="top-section">
        <Header title={"Dashboard"} />
      </div>
      <div className="bottom-section">
        <div className="first-row">
          <div className="total-overview">
            <DashboardBox title="Total Overview" content={<TotalOverview />} />
          </div>

          <div className="occupancy-rate">
            <DashboardBox
              title="Occupancy Rate"
              content={<OccupancyLineChart />}
            />
          </div>
        </div>
        <div className="second-row">
           <div className="top-dishes">
            <DashboardBox title="Trending Orders" content={<TopDishesPieChart data={dishData}/>} />
           </div>
           <div className="top-category">
            <DashboardBox title="Trending Category" content={<TopDishesPieChart data={categoryData} />}/>
           </div>
        </div>
        
      </div>
    </div>
  );
}

export default DashBoard;
