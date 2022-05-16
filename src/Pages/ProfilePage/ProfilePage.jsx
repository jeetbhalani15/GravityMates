import React, { useEffect, useState } from 'react'
import {AiOutlineLogout} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import logo from "../../Assets/Images/logo.png"
import Card from '../../Components/Card/Card'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/SideBar/Sidebar'
import SuggestionCard from '../../Components/SuggestionCard/SuggestionCard'
import EditModal from '../../Components/User-edit-modal/EditModal'
import PostModal from '../../Components/User-post-modal/PostModal'
import { fetchAllUsersData, logoutUser } from '../../features/Auth/authSlice'

function ProfilePage() {
    const [show, setShow] = useState(false)
    const [userImage, setUserImage] = useState("https://i.imgur.com/2MVjicu.png")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {username} = useParams();
    let currentUser = ''

    const userData = useSelector(state => state.user)
    console.log(userData.user)

    useEffect(()=>{
        dispatch(fetchAllUsersData())
    },[])
    
    const findUser = userData.allUsers.users?.find((user)=> user.username === username)

    if(findUser?.username === userData.user?.username){
        currentUser = userData.user
    } else {
        currentUser = findUser
    }
    console.log(currentUser)

    const logouthandler = ()=>{
      dispatch(logoutUser())
      navigate("/");
      
    }  
    return (
      <>    <div className="relative flex justify-center bg-[#edf7ff] mt-[-1.5rem]">
        {/* // HEADER_SECTION */}
        <Header />
       {show && <EditModal setShow={setShow} userImage={userImage} setUserImage={setUserImage} />}

        {/* BODY_SECTION POST CARD  */}
        <div className="mt-20 lg:mt-8 w-fit lg:p-8 lg:bg-[#69696933] lg:w-[43.2rem]">
            <div className='lg:p-8 mt-[-3rem]'>
         <div className='flex gap-3 lg:gap-6 items-center justify-center mt-4'>
             <div className='w-20 lg:w-28 '>
                 <img className='rounded-[50%]' src={userImage} alt="logo"/>
             </div>
             <div className='flex gap-4 flex-col p-2'>
                 <div className='flex items-center gap-4'>
                     <div className='font-bold lg:text-xl lg:pr-2 '>{currentUser?.username}</div>
                     <div><button onClick={()=> setShow(true)} className=' p-1 rounded-md bg-slate-400 text-sm lg:p-2'>Edit profile</button></div>
                     <div onClick={logouthandler} ><AiOutlineLogout size={20} /></div>
                 </div>
                 <div>
                 <div className='flex gap-1 lg:gap-6'>
                     <span> posts 4</span>
                     <span>followers 20</span>
                     <span>following 10</span>
                 </div>
             </div>
             <div className=' text-slate-800'>{currentUser?.website}</div>
             </div>
         </div>
         <div className='mt-2'><p className=' text-center'>{currentUser?.bio}</p></div>
         </div>
         <div className='lg:overflow-y-auto lg:h-[31.5rem]'>
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