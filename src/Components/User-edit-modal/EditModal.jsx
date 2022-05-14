import React from 'react'
import {BiImageAdd} from "react-icons/bi"
import {MdPostAdd} from "react-icons/md"
import {IoIosClose} from "react-icons/io"
import logo from "../../Assets/Images/logo.png"

const EditModal = ({setShow}) => {
  return (
    <div className=" h-full w-full flex justify-center items-center bg-[#0000006b] z-40 absolute top-0">
    <div className=" relative flex gap-6 justify-center flex-col items-center rounded-lg border-slate-800 border-2 w-fit p-4 z-20  bg-slate-300 lg:w-96">
     <h1 className=" text-xl text-sky-900 font-bold mt-2 ">Edit profile</h1>
     <span className=' absolute top-[10px] right-[14px] hover:bg-slate-400 '><IoIosClose onClick={()=>setShow(false)} size={25}/></span>
     <div className='flex flex-col justify-center items-center gap-6'>
     <div className='w-20 lg:w-18 '>
              <img className='rounded-full' src={logo} alt="logo"/>
          </div>
          <div className='flex justify-center flex-col gap-4'>
            <div className='flex items-center gap-2'>
            <label className='p-1'>Name:</label><span className=' font-semibold'>jeeet</span>
            </div>
            <div className='flex items-center gap-2'>
            <label className='p-1'>username:</label><span className=' font-semibold'>jeeet13</span>
            </div>
            <div className='flex items-center gap-2'>
            <label className='p-1'>Website:</label><input className='p-1' type="link" placeholder='link...' />
            </div>
           <div className='flex items-start gap-2'>
                <label className='p-1'>Bio:</label>
               <textarea className=" w-full p-1 " type="text" rows={8} placeholder='tell something about you...'/>
           </div>
            
          </div>
     </div>
     
     <div className="flex gap-2">
       <button className="p-1 flex items-center gap-2 rounded-md  bg-slate-400"><MdPostAdd/>update</button>
     </div>
   </div>
    </div>
  )
}

export default EditModal