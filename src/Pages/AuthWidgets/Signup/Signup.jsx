import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaRegUser} from "react-icons/fa"
import {HiLockClosed} from "react-icons/hi"
import {MdOutlineAlternateEmail} from "react-icons/md"
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchSignupUserData } from '../../../features/Auth/authSlice'

function Signup() {
  const [userData, setUserData] = useState({username: "", password: "", firstName: "", lastName: "", email: ""} );
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const signupHandler = (e)=>{
    e.preventDefault();
    dispatch(fetchSignupUserData(userData));
    navigate("/home")
  }
  return (
    <div className="h-screen flex justify-center bg-zinc-200 ">
    <div className="flex lg:w-1/2 justify-center items-center space-y-8">
      <div className="w-[85%]  px-8 md:px-32 lg:px-24">
      <form onSubmit={(e)=>signupHandler(e)} className="bg-white rounded-md shadow-2xl p-5">
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hi Mate!!</h1>
        <p className="text-sm font-normal text-gray-600 mb-8">Sign up to gravity Account</p>

        <div className='lg:flex lg:items-center lg:gap-3'>
        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
        <FaRegUser size={15} color="grey"/>
          <input onChange={(e)=> setUserData((pre)=>({...pre, firstName: e.target.value}))} value={userData.firstname} id="firstname" className=" pl-2 w-full outline-none border-none" type="text" name="firstname" placeholder="First name" required />
        </div>

        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
        <FaRegUser size={15} color="grey"/>
          <input onChange={(e)=> setUserData((pre)=>({...pre, lastName: e.target.value}))} value={userData.lastname} id="lastname" className=" pl-2 w-full outline-none border-none" type="text" name="lastname" placeholder="Last name" required />
        </div>
        </div>

        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
        <FaRegUser size={15} color="grey"/>
          <input onChange={(e)=>  setUserData((pre)=>({...pre, username: e.target.value}))} value={userData.username} id="username" className=" pl-2 w-full outline-none border-none" type="text" name="username" placeholder="Username" required />
        </div>

        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
        <MdOutlineAlternateEmail size={18} color="grey"/>
          <input onChange={(e)=>  setUserData((pre)=>({...pre, email: e.target.value}))} value={userData.email} id="username" className=" pl-2 w-full outline-none border-none" type="text" name="username" placeholder="Email address" required />
        </div>


        <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
        <HiLockClosed size={18} color="grey"/>
          <input onChange={(e)=>  setUserData((pre)=>({...pre, password: e.target.value}))} value={userData.password} className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" required />
        </div>


        <button type="submit" className="block w-full bg-slate-500 mt-5 py-2 rounded-2xl hover:bg-slate-400 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Create a Account</button>

        <div className="flex justify-between mt-4">
          <Link to={"/login"}><span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Already have account</span></Link>
        </div>
        
      </form>
      </div>
      
    </div>
</div>
  )
}

export default Signup