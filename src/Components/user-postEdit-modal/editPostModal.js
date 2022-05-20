
import  { useState, React } from 'react'
import {BiImageAdd} from "react-icons/bi"
import {MdPostAdd} from "react-icons/md"
import {IoIosClose} from "react-icons/io"
import logo from "../../Assets/Images/logo.png"
import { useDispatch, useSelector } from 'react-redux'
import {  editPost, getPost, usePosts,  } from '../../features/Posts/postSlice'
import { useAuth } from '../../features/Auth/authSlice'

const EditPostModal = ({setShowEditModal,postsData,setPostsData,setShowMenu, postId}) => {
    const userData = useSelector(state=>state.user);
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const {token} = useAuth();
    const { isLoading } = usePosts()
    const postData = postsData
  
  const postDatahandler = (e)=>{
      setPostsData(pre=>({...pre, [e.target.name] : e.target.value}))
  }
  const handlePostImage = (e)=>{
    let reader = new FileReader();
  
    reader.readAsDataURL(e.target.files[0]);
  
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPostsData(pre => ({...pre, img:reader.result}));
      }
    };
  }
  
   const handleNewEditedPostSubmit = (e)=>{
    e.preventDefault();
    // const {firstName,lastName} = users;
    // console.log(firstName)
    const postData = postsData
    dispatch(editPost({postData,token,postId}))
    dispatch(getPost())
    setShowEditModal(false)
    setShowMenu(false)
  
   }
  return (
    <div className=" h-full w-full flex justify-center items-center bg-[#0000006b] z-40 absolute left-0 top-0">
    <form onSubmit={handleNewEditedPostSubmit}>
     <div className=" relative flex gap-6 justify-center flex-col items-center rounded-lg border-slate-800 border-2 w-fit p-4 z-20  bg-slate-300 lg:w-96 dark:bg-[#1a1919]">
      <h1 className=" text-xl text-sky-900 font-bold mt-2 ">New Post</h1>
      <span className=' absolute top-[10px] right-[14px] hover:bg-slate-400 '><IoIosClose onClick={()=>setShowEditModal(false)} size={25}/></span>
      <div className='flex items-start gap-6'>
      <div className='w-20 lg:w-22 '>
               <img className='rounded-full' src={userData.user?.img} alt="logo"/>
               <img className='w-24 mt-8 rounded-[5px]' src={postsData?.img} alt=""/>
           </div>
           <div className='flex flex-col items-center gap-4'>
             <input className='p-1 dark:text-black' type="text" maxLength="100" onChange={(e)=>postDatahandler(e)} value={postData?.caption} name="caption" placeholder='caption...' required />
             <textarea className=" w-full p-1 dark:text-black" maxLength="120" type="text" rows={8} placeholder='whats happening ?'
             value={postData?.content} name="content" onChange={(e)=>postDatahandler(e)} required/>
           </div>
      </div>
      
      <div className="flex gap-2">
        <label className='flex p-2 items-center gap-2 rounded-md bg-slate-400 dark:bg-[#8688885c]' htmlFor='image'><BiImageAdd/>Add Image
        <input type='file' accept="image/*" id="image" onChange={handlePostImage} name="img"  className=" invisible w-0 p-0 "/>
        </label>
        <button className="p-2 flex items-center gap-2 rounded-md  bg-slate-400 dark:bg-[#8688885c]"><MdPostAdd/>{ isLoading ? 'add post...':"add post"}</button>
      </div>
    </div>
    </form>
     </div>
  )
}

export default EditPostModal