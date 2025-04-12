import React from "react";
import { GoContainer } from "react-icons/go";
import "./Setting.scss";
import Header from "../../component/Header/Header";
import { useSelector } from "react-redux";
import LeafletMap from "../../component/MapAddress/MapAddress";

function Setting() {
  const userInfo = useSelector((state) => state.UserReducer.owner);
  //   const restaurantId = userInfo?.restaurant?._id;

  // async function getOwnerInfo() {
  //   try {
  //     const response = await axiosClient.get("/owner/getownerinfo");
  //     console.log(response);

  //     if (response) {
  //       dispatch(ownerInfo(response.result));
  //     }
  //     if (response.result.restaurant) {
  //       const restaurantId = response.result.restaurant._id;
  //       getNotification(restaurantId);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className="setting-container">
      <div className="setting-heading">
        <Header title="Manage Restaurant Info" />
      </div>
      <div className="setting-restro-info">
        <div className="left">
          <div className="restro-detail">
            <p>Restaurant Name</p>
            <h3>{userInfo?.restaurant?.name}</h3>
          </div>
          <div className="restro-detail">
            <p>Restaurant Address</p>
            <h3>{userInfo?.restaurant?.address}</h3>
          </div>
          <div className="restro-detail">
            <p>Restaurant Owner</p>
            <h3>{userInfo?.name}</h3>
          </div>

          <div className="restro-detail">
            <p>Restaurant Contact no.</p>
            <h3>{userInfo?.restaurant?.name}</h3>
          </div>
          <div className="restro-detail">
            <p>Registered On</p>
            <h3>{userInfo?.restaurant?.name}</h3>
          </div>
        </div>
        <div className="right">
          <LeafletMap
            position={{ lat: 28.6139, lng: 77.209 }} // Replace with your location
            name="LocalHost Restaurant"
          />
        </div>
      </div>
    </div>
  );
}

export default Setting;
