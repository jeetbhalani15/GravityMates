
import React from 'react'
import {FiHome} from "react-icons/fi"
import {BiMessageSquareAdd} from "react-icons/bi"
import {FiHeart} from "react-icons/fi"
import {BsBookmark} from "react-icons/bs"
import {FaRegUser} from "react-icons/fa"
import logo from "../../Assets/Images/logo.png"
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <>
    <div className="flex items-center justify-around gap-3 w-full p-2 fixed bottom-0 bg-white lg:absolute lg:left-44 lg:top-8 lg:mb-12 z-20 lg:flex-col lg:w-60 lg:h-fit lg:items-start lg:p-8 lg:bg-zinc-200  lg:rounded-tl-3xl lg:pb-60">
         <Link to={"/"}><div className=' hidden lg:block text-2xl   lg:text-sky-900 ml-8 font-extrabold  font-mono'>
           Gravity
         <div className='lg:ml-16 text-xs'>Mates</div>
         </div></Link>
         
        <span className='hidden lg:block lg:text-xl'>Account</span>
     <div className='flex items-center  gap-4 cursor-pointer hover:bg-[aliceblue] rounded-lg  py-4 pl-2 pr-12'>
       <FiHome  size={20}/>
       <span className='hidden lg:block'>Home</span>
     </div>
     <div className='flex items-center gap-3 cursor-pointer hover:bg-[aliceblue] rounded-lg    py-4 pl-2 pr-12'>
       <BiMessageSquareAdd size={20}/>
       <span className='hidden lg:block'>Explore</span>
     </div>
     <div className='flex items-center gap-3 cursor-pointer hover:bg-[aliceblue] rounded-lg   py-4 pl-2 pr-12'>
       <BsBookmark size={20}/>
       <span className='hidden lg:block'>Bookmark</span>
     </div>
     <div className='flex items-center gap-3 cursor-pointer hover:bg-[aliceblue] rounded-lg   py-4 pl-2 pr-12'>
       <FiHeart size={20}/>
       <span className='hidden lg:block'>Notifications</span>
     </div>
     <div className='flex items-center gap-3 cursor-pointer hover:bg-[aliceblue] rounded-lg   py-4 pl-2 pr-12'>
       <FaRegUser size={20}/>
       <span className='hidden lg:block'>My Profile</span>
     </div>
     <div className="w-8 flex items-center gap-3 cursor-pointer lg:hidden" >
         <img  className="rounded-full object-contain" src={logo} alt="logo" srcset="" />
         <span className='hidden lg:block'>Profile</span>
       </div>
    </div>
    </>
    

  )
}

export default Sidebar