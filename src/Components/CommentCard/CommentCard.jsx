import React from 'react'
import logo from "../../Assets/Images/logo.png"

const CommentCard = ({commentData}) => {
  return (
    <div className="flex items-start gap-2 p-2">
          <div><img className="w-7 rounded-full" src={logo} alt="logo" /></div>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
            <h2 className=" text-[14px] font-bold">{commentData.username}</h2>
            <p className="text-md text-gray-800">{commentData.text}</p>
            </div>    
            <div className="flex items-center gap-2 mt-[-4px] ">
            <small className="text-xs">8hr ago</small>
            <small>reply</small>
            </div>
          </div>
        </div>
  )
}

export default CommentCard