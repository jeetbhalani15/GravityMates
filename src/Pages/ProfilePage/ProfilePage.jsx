import React from 'react'
import {AiOutlineLogout} from "react-icons/ai"
import { Link } from 'react-router-dom'
import logo from "../../Assets/Images/logo.png"
import Card from '../../Components/Card/Card'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/SideBar/Sidebar'
import SuggestionCard from '../../Components/SuggestionCard/SuggestionCard'
import PostModal from '../../Components/User-post-modal/PostModal'

function ProfilePage() {
  return (
      <>    <div className="relative flex justify-center bg-[#edf7ff] mt-[-1.5rem]">
        {/* // HEADER_SECTION */}
        <Header />
       {false && <PostModal/>}

        {/* BODY_SECTION POST CARD  */}
        <div className="mt-20 lg:mt-6 w-fit lg:p-8 lg:bg-[#69696933] lg:w-[43.7rem]">
            <div className='lg:p-8'>
         <div className='flex gap-3 items-center justify-center mt-4'>
             <div className='w-20 lg:w-28 '>
                 <img className='rounded-full' src={logo} alt="logo"/>
             </div>
             <div className='flex gap-4 flex-col p-2'>
                 <div className='flex gap-4'>
                     <div className='font-bold '>Yodha</div>
                     <div><button className=' p-1 rounded-md bg-slate-300 text-sm'>Edit profile</button></div>
                     <div><AiOutlineLogout size={20} /></div>
                 </div>
                 <div>
                 <div className='flex gap-1 lg:gap-6'>
                     <span> posts 4</span>
                     <span>followers 20</span>
                     <span>following 10</span>
                 </div>
             </div>
             {/* <div className=' text-slate-800'><Link to={"https://www.google.com/"}>Copy Profile Link</Link></div> */}
             </div>
         </div>
         <div className='mt-2'><p className=' text-center'>Badminton | Web Developer</p></div>
         </div>
         <div className='lg:overflow-y-auto lg:h-[29rem]'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
        </div>
        

        {/* //  NAVBAR_SECTION */}
        <Sidebar />
      </div>
      <SuggestionCard/>
      </>

  )
}

export default ProfilePage