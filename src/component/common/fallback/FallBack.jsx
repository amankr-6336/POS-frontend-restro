import React from 'react'
import './FallBack.scss'
import Button from '../button/Button'

function FallBack({OnOpen}) {
  return (
    <div className="fallback">
         <h2>Add Restaurant to Avail Option</h2>
        <Button onClick={OnOpen}>Add Restaurant</Button>
    </div>
  )
}

export default FallBack