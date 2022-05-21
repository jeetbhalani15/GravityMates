import React from "react";
import logo from "../../Assets/Images/logo.png";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useAuth } from "../../features/Auth/authSlice";

const CommentCard = ({commentData,setShowModal,editHadnler,deleteCommentHandler}) => {
  const { user } = useAuth();
  return (
    <div className="flex items-start gap-2 p-2">
      <div>
        <img className="w-7 rounded-full" src={logo} alt="logo" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <h2 className=" text-[14px] font-bold">{commentData.username}</h2>
          <p className="text-md text-gray-400">{commentData.text}</p>
        </div>
        <div className="flex items-center gap-2 mt-[-4px] ">
          <small className="text-xs">8hr ago</small>
          <small>reply</small>
          {user?.username === commentData?.username && (
            <div className="flex gap-4 ml-56 hover:cursor-pointer">
              <small
                onClick={() => editHadnler(commentData.text, commentData._id)}
                className="hover:opacity-60"
              >
                <MdOutlineModeEdit size={18} />
              </small>
              <small
                onClick={() => deleteCommentHandler(commentData._id)}
                className="hover:opacity-60"
              >
                <MdDeleteOutline size={18} />
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
