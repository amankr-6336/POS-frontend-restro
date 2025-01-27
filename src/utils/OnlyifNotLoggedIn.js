import React from 'react'
import { Navigate } from 'react-router-dom';

function OnlyifNotLoggedIn() {
    const user=localStorage.getItem("accessToken");

  return (
    user? <Navigate to='/' /> : <Navigate to='/login' />
  )
}

export default OnlyifNotLoggedIn