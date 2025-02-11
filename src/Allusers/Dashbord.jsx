import React from 'react'


import Sidebar from './Sidebar'


import { Outlet } from 'react-router-dom'

function Daschbord() {
  return (
    <div className=' w-full mt-[60px]'>
       
 <div className='border-b-2 shadow-xxl border-gray-200 w-[100%]'>
  
      
   
    </div>
  
    <div className='flex flex-row items-center md:items-start md:flex-row   '> 
   
      <Sidebar></Sidebar>
     
    
         <Outlet></Outlet>

    </div>
  
    </div>
   
  )
}

export default Daschbord
