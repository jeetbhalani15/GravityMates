import React from 'react'
import {FiHeart} from "react-icons/fi"
import {FiMessageCircle} from "react-icons/fi"
import {FiSend} from "react-icons/fi"
import {BsBookmark} from "react-icons/bs"
import {ImSearch} from "react-icons/im"
import logo from "../../Assets/Images/logo.png"

function Card() {
  return (
    <div className="justify-center p-0.5 max-w-xl lg:ml-24">
    <div className="w-8 flex items-center gap-1 p-1">
         <img className='rounded-full' src={logo} alt="logo" srcset="" />
         yodha
       </div>
       <img className=' w-full lg:w-10/12 ' src={logo} alt="" srcset="" />
       <div className="flex items-center justify-between p-2 lg:w-10/12">
         <div className="flex items-center gap-4 ">
       <div>
       <FiHeart size={20}/>
     </div>
     <div>
       <FiMessageCircle size={20}/>
     </div>
     <div>
       <FiSend size={20}/>
     </div>
     </div>
     <div><BsBookmark size={20}/> </div>
       </div>
    </div>
  )
}

export default Card