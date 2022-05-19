import React from 'react'
import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from '../../features/Auth/authSlice';
import { fetchEditComment } from '../../features/Posts/postSlice';


const EditCommentModal = ({ setShowModal, recentComment, postId }) => {
    const dispatch = useDispatch();
    const {token} = useAuth();
    let { commentId, text } = recentComment;
    const [commentData, setCommentData ] = useState({text : text});

    const commentEditHandler = () => {
        dispatch(fetchEditComment({token, postId, commentId, commentData}));
        setShowModal(false);
    }
  return (
    <>
    <div className="modal opacity-2 z-50 w-full h-full absolute  flex items-center justify-center">
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

        <div className="modal-content py-6 text-left px-6 flex flex-col">

            <div className="flex justify-between mb-3 cursor-pointer text-gray-500 hover:text-slate-800">
                <h1 className="text-lg text-black">Edit Comment</h1>
                <VscChromeClose onClick={() => setShowModal(false)}  className="text-2xl" />
            </div>

            <input onChange={(e) => setCommentData(pre => ({...pre, text : e.target.value}))} value={commentData.text} className="border outline-none p-2  mb-3" type="text"  />

            <button onClick={commentEditHandler} className="modal-close w-max ml-auto py-2 bg-cyan-500 px-6 rounded-md text-white hover:bg-blue-400">Update</button>

        </div>
        </div>
    </div>

</>
  )
}

export default EditCommentModal