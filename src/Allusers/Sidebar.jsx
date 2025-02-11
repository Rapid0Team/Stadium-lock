import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelope ,faArrowRight } from '@fortawesome/free-solid-svg-icons'

import {faUsers ,faUserPlus,faPlus,faList} from '@fortawesome/free-solid-svg-icons'
import {faProductHunt} from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {

  const [open,setOpen]=useState(true);
  return (

    
    <div className={`${open ? "w-[22%]" :"w-[10px]"} duration-300 mt-[30px]  md:h-screen  bg-blue-900 relative h-screen `}>
      <FontAwesomeIcon icon={faArrowRight} className={`-right-3 absolute top-9 border-2   text-whit cursor-pointer rounded-full ${!open && "rotate-180"}`} onClick={()=>setOpen(!open)}/>

    
      
    <div className='flex flex-col gap-[40px] items-center mt-[20px]'>
    <div className='flex flex-col gap-[40px] items-center mt-[20px]'>
  <Link 
 
    to='/Daschbord/users' 
    className={`text-2xl text-[30px] bg-blue-400 p-1 rounded-md text-white md:w-[200px] hover:bg-blue-300 hover:p-2 transition-all duration-200 ${!open ? "hidden" : ""}`}
    onClick={()=>setOpen(!open)}
  > 
    <FontAwesomeIcon icon={faUsers} /> Users
  </Link>
</div>

    
     
    </div>
 
    </div>
  

   
  )
}
