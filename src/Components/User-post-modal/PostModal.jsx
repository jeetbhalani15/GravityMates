import React from 'react'
import {BiImageAdd} from "react-icons/bi"
import {MdPostAdd} from "react-icons/md"


function PostModal() {
  return (
    <div className=" h-full w-full flex justify-center items-center bg-[#0000006b] z-40 absolute top-0">
       <div className="flex gap-4 justify-center flex-col items-center border-slate-800 border-2 w-fit p-4 z-20  bg-slate-300 lg:w-96">
        <h1 className=" text-xl text-sky-900 font-bold ">New Post</h1>
        <textarea className=" w-full " type="text" row="4" col="8"/>
        <div className="flex gap-2">
          <button type='image' className="p-1 flex items-center gap-2 rounded-md bg-slate-400"><BiImageAdd/>Add image</button>
          <button className="p-1 flex items-center gap-2 rounded-md  bg-slate-400"><MdPostAdd/>Add to feed</button>
        </div>
      </div>
       </div>
  )
}

export default PostModal