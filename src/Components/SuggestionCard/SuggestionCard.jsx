import React from 'react'
import {FaRegBell} from "react-icons/fa"
import {AiOutlineLogout} from "react-icons/ai"
import logo from "../../Assets/Images/logo.png"
import SuggestedCard from '../SuggestedCard/SuggestedCard'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../features/Auth/authSlice'

function SuggestionCard() {
  const dispatch = useDispatch();
  const userData = useSelector(state=> state.user);
  const logoutHandler = ()=>{
    dispatch(logoutUser())
    navigate("/");
    
  } 
  return (
    <div className=" hidden xs:hdden lg:flex lg:flex-col lg:w-80 lg:p-2 lg:gap-3 lg:absolute lg:top-2 lg:right-24 lg:z-20 lg:bg-zinc-200 lg:rounded-tr-3xl ">
    <div className="lg:flex lg:items-center lg:justify-end lg:gap-2 lg:p-4 hover:cursor-pointer">
      <div className=" hidden xs:hidden lg:block">
        <AiOutlineLogout onClick={logoutHandler} size={20} />
      </div>
      <div className=" hidden xs:hidden lg:block">
        <FaRegBell size={20} />
      </div>
      <Link to={"/login"}><img
        className="lg:rounded-full lg:ml-2 lg:w-10"
        src={userData.user?.img}
        alt="logo"
        srcset=""
      /></Link>
    </div>
    <h1 className=" xs: hidden lg:text-lg lg:flex lg:justify-center">
      Popular Activities
    </h1>
      <SuggestedCard/>
      <SuggestedCard/>
      <SuggestedCard/>
      <SuggestedCard/>
  </div>
  )
}

export default SuggestionCard