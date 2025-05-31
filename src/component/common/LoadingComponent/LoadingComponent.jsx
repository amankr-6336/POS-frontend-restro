import React from 'react'
import { ClipLoader } from 'react-spinners'

function LoadingComponent() {
  return (
    <div style={{width:"100%",height:"100vh" ,display:"flex",justifyContent:"center",alignItems:"center"}}>
        <ClipLoader color="#4F46E5" size={50} />
      </div>
  )
}

export default LoadingComponent