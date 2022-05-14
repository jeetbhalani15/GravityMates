import React from 'react'
import {BiImageAdd} from "react-icons/bi"
import {MdPostAdd} from "react-icons/md"
import {IoIosClose} from "react-icons/io"
import logo from "../../Assets/Images/logo.png"


function PostModal({setShow}) {
  return (
    <div className=" h-full w-full flex justify-center items-center bg-[#0000006b] z-40 absolute top-0">
       <div className=" relative flex gap-6 justify-center flex-col items-center rounded-lg border-slate-800 border-2 w-fit p-4 z-20  bg-slate-300 lg:w-96">
        <h1 className=" text-xl text-sky-900 font-bold mt-2 ">New Post</h1>
        <span className=' absolute top-[10px] right-[14px] hover:bg-slate-400 '><IoIosClose onClick={()=>setShow(false)} size={25}/></span>
        <div className='flex items-start gap-6'>
        <div className='w-20 lg:w-22 '>
                 <img className='rounded-full' src={logo} alt="logo"/>
             </div>
             <div className='flex flex-col items-center gap-4'>
               <input className='p-1' type="text" placeholder='caption...' />
               <textarea className=" w-full p-1 " type="text" rows={8} placeholder='whats happening ?'/>
             </div>
        </div>
        
        <div className="flex gap-2">
          <button type='image' className="p-1 flex items-center gap-2 rounded-md bg-slate-400"><BiImageAdd/>Add image</button>
          <button className="p-1 flex items-center gap-2 rounded-md  bg-slate-400"><MdPostAdd/>Add to feed</button>
        </div>
      </div>
       </div>
  )
}

export default PostModal