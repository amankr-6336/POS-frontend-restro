import React from 'react'

function EmptyState({boldtext="",subtext=""}) {
  return (
    <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"10px"}}>
    <p style={{fontWeight:"500",fontSize:"1.4rem",color:"#43434e"}} >
      {boldtext}
    </p>
    <p style={{fontWeight:"400",fontSize:"1rem",color:"#575764"}} >
      {subtext}
    </p>
  </div>
  )
}

export default EmptyState