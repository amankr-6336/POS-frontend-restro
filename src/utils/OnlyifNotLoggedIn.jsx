import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function OnlyifNotLoggedIn() {
    const user=localStorage.getItem("accessToken");
    console.log(user);

  return (
    user? <Navigate to='/dashboard/setting' /> : <Outlet/>
  )
}

export default OnlyifNotLoggedIn