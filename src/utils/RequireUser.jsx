import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function RequireUser() {
    const user=localStorage.getItem("accessToken");
    console.log(user);

  return (
    user? <Outlet/> : <Navigate to='/login' />
  )
}

export default RequireUser