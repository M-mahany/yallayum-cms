import React from 'react'
import { Outlet } from 'react-router-dom'
 

const Bodyarea = () => {
  return (
    <div className='bodyarea md:h-screen h-fit '>
      <Outlet/>
    </div>
  )
}

export default Bodyarea