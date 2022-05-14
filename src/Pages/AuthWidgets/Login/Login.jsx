import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaRegUser} from "react-icons/fa"
import {HiLockClosed} from "react-icons/hi"
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginUserData } from '../../../features/Auth/authSlice';

function Login() {
  const [userData, setUserData] = useState({username: "", password: ""});
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  const navigate = useNavigate();

  const guestData = {
    username: "adarshbalika",
    password: "adarshBalika123",
  }

  const guestLoginHandler = ()=>{
    dispatch(fetchLoginUserData(guestData))
    navigate("/")
  }

  const loginHandler = (e,userData)=>{
    e.preventDefault();
    dispatch(fetchLoginUserData(userData))
    navigate("/")
  }
  return (
 <div className="h-screen flex justify-center bg-zinc-200 ">
          <div className="flex lg:w-1/2 justify-center items-center space-y-8">
            <div className="w-[85%]  px-8 md:px-32 lg:px-24">
            <form onSubmit={(e)=>loginHandler(e,userData)} className="bg-white rounded-md shadow-2xl p-5">
              <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
              <p className="text-sm font-normal text-gray-600 mb-8">Login to gravity account</p>

        {/* INPUT USERNAME */}

              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <FaRegUser size={15} color="grey"/>
                <input onChange={(e)=>  setUserData((pre)=>({...pre, username: e.target.value}))} id="email" className=" pl-2 w-full outline-none border-none" type="text" name="email" placeholder="Username" required />
              </div>

        {/* INPUT PASSWORD */}

              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
               <HiLockClosed size={16} color="grey"/>
                <input onChange={(e)=>  setUserData((pre)=>({...pre, password: e.target.value}))} className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" required /> 
              </div>

      {/* GUEST BTN */}

              <button onClick={guestLoginHandler} type="submit" className="block w-full bg-slate-500 mt-5 py-2 rounded-2xl hover:bg-slate-400 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login as a Guest</button>

      {/* LOGIN BTN */}

              <button type="submit" className="block w-full bg-slate-500 mt-5 py-2 rounded-2xl hover:bg-slate-400 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>

              <div className="flex justify-between mt-4">
                <Link to={"/signup"}><span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</span></Link>
              </div>
              
            </form>
            </div>
            
          </div>
      </div>
  )
}

export default Login