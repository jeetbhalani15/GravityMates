
import React, { useEffect } from 'react'
import {FiHome} from "react-icons/fi"
import {VscRocket} from "react-icons/vsc"
import {FiHeart} from "react-icons/fi"
import {BsBookmark} from "react-icons/bs"
import {FaRegUser} from "react-icons/fa"
import {IoMdAddCircleOutline} from "react-icons/io"
import logo from "../../Assets/Images/logo.png"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsersData } from '../../features/Auth/authSlice'


function Sidebar({setShow}) {
  const userData = useSelector(state => state.user)
  const dispatch = useDispatch();

  useEffect(()=>{
   dispatch(fetchAllUsersData())
  },[])
  return (
    <>
    <div className=" backdrop-blur-sm bg-gray-800/70 flex items-center justify-around  w-full p-2 fixed bottom-0 bg-white lg:absolute lg:left-44 lg:top-8 lg:mb-12 z-20 lg:flex-col lg:w-60 lg:h-fit lg:items-start lg:p-8 lg:bg-zinc-200  lg:rounded-tl-3xl lg:pb-[25.8rem] dark:bg-[#282828] dark:text-white">
         <Link to={"/home"}><div className=' hidden lg:block text-2xl   text-[#019db1] ml-8 font-extrabold  font-mono'>
           Gravity
         <div className='lg:ml-16 text-xs'>Mates</div>
         </div></Link>
         
        <span className='hidden lg:block lg:text-xl'>Account</span>
     <Link to={"/home"}><div className='flex items-center  gap-4 cursor-pointer hover:bg-[aliceblue] dark:hover:bg-[#5556565c] rounded-lg  py-4 pl-2 pr-8'>
       <FiHome  size={20}/>
       <span className='hidden lg:block'>Home</span>
     </div></Link>
     <Link to={"/explore"}><div className='flex items-center gap-3 cursor-pointer hover:bg-[aliceblue] dark:hover:bg-[#5556565c] rounded-lg    py-4 pl-2 pr-8'>
       <VscRocket size={20}/>
       <span className='hidden lg:block'>Explore</span>
     </div></Link>
     <Link to={"/bookmark"}><div className='hidden lg:flex items-center gap-3 cursor-pointer hover:bg-[aliceblue] dark:hover:bg-[#5556565c] rounded-lg   py-4 pl-2 pr-8'>
       <BsBookmark size={20}/>
       <span className='hidden lg:block'>Bookmark</span>
     </div></Link>

     <div className=' lg:hidden  items-center gap-3 cursor-pointer hover:bg-[aliceblue] dark:hover:bg-[#5556565c] rounded-lg   py-4  pr-10' onClick={()=>setShow(true)}>
       <IoMdAddCircleOutline size={20}/>
     </div>
     {/* <div className='flex items-center gap-3 cursor-pointer hover:bg-[aliceblue] dark:hover:bg-[#5556565c] rounded-lg   py-4 pl-2 pr-8'>
       <FiHeart size={20}/>
       <span className='hidden lg:block'>Notifications</span>
     </div> */}
     <Link to={"/bookmark"}><div className='lg:hidden  items-center gap-3 cursor-pointer hover:bg-[aliceblue] dark:hover:bg-[#5556565c] rounded-lg   py-4 pl-2 pr-8'>
       <BsBookmark size={20}/>
       <span className='hidden lg:block'>Bookmark</span>
     </div></Link>
     <Link to={`/profile/${userData?.user?.username}`}><div className=' hidden lg:flex lg:items-center lg:gap-3 cursor-pointer hover:bg-[aliceblue] dark:hover:bg-[#5556565c] rounded-lg   py-4 pl-2 pr-8'>
       <FaRegUser size={20}/>
       <span className='hidden lg:block'>My Profile</span>
     </div></Link>
     <Link to={`/profile/${userData.user?.username}`}><div className="w-8 flex items-center gap-3 cursor-pointer lg:hidden" >
         <img  className="rounded-full object-contain" src="https://i.imgur.com/2MVjicu.png" alt="logo" srcset="" />
         <span className='hidden lg:block'>Profile</span>
       </div></Link>
    </div>
    </>
    

  )
}

export default Sidebar