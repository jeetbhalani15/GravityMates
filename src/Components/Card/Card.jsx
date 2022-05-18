import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { RiMoreFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import logo from "../../Assets/Images/logo.png";
import { useAuth } from "../../features/Auth/authSlice";
import { useDispatch } from "react-redux";
import { deletePost, getPost } from "../../features/Posts/postSlice";
import EditPostModal from "../user-postEdit-modal/editPostModal";

function Card({ postData }) {
  const [show, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [postsData, setPostsData] = useState({caption: postData?.caption, content: postData?.content, img: postData?.img})
  const { token, user } = useAuth();
  const dispatch = useDispatch();

  const deletePostHandler = () => {
    dispatch(deletePost({ postId: postData?._id, token }));
    dispatch(getPost());
    setShowMenu(false);
  };

  return (
    <div className=" flex items-center justify-center max-w-xl hover:cursor-pointer">
      <div className="justify-center p-0.5 max-w-xl border border-slate-400  ">
        <div className=" relative flex items-center justify-between rounded-lg p-2 border-b border-slate-400">
          <div className="  w-12 flex items-center gap-2 p-1">
            <img className="rounded-full" src={logo} alt="logo" />
            <div className="flex flex-col">
              yodha
              <small className="w-44">{`${postData?.username} . May 16`}</small>
            </div>
          </div>
          <RiMoreFill onClick={() => setShowMenu(!showMenu)} size={18} />
        </div>

        {showMenu && (
          <div className=" absolute right-[31%] p-2 border bg-slate-300 w-fit">
            {user?.username === postData?.username ? (
              <>   
              <div className="flex " onClick={() => setShowEditModal(true)}>
                <span className="px-1 py-1 flex items-center gap-1">
                  <MdDeleteOutline className="" color="grey" size={20} />
                  edit
                </span>
              </div>
             <div className="flex " onClick={() => deletePostHandler()}>
                <span className="px-1 py-1 flex items-center gap-1">
                  <MdDeleteOutline className="" color="grey" size={20} />
                  delete
                </span>
              </div>
              </>

            ) : (
              <div className="flex ">
                <span className="px-1 py-1 flex items-center gap-1">
                  <MdDeleteOutline className="" color="grey" size={20} />
                  unfollow
                </span>
              </div>
            )}
          </div>
        )}

        <div className=" w-full lg:w-[30rem] ">
          <img className=" p-2 w-full lg:w-[30rem]" src={postData?.img} alt="" />
          <p className="p-4">{postData?.content}</p>
        </div>

        <div className="border-t border-slate-400">
          <div className="flex items-center justify-between p-4 lg:w-[30rem]">
            <div className="flex items-center gap-4 ">
              <div>
                <FiHeart size={20} />
              </div>
              <div onClick={() => setShowComments(!show)}>
                <FiMessageCircle size={20} />
              </div>
              <div>
                <FiSend size={20} />
              </div>
            </div>
            <div>
              <BsBookmark size={20} />{" "}
            </div>
          </div>

          <div className="flex flex-col justify-center ml-4 w-[28rem]">
            <div>30 Likes</div>
            <p className="w-full">{postData?.caption}</p>
          </div>
        </div>

        {show && (
          <div className=" p-2 flex items-center gap-2 w-[28rem] ">
            <img className="w-8 rounded-full" src={logo} alt="logo" />
            <input
              className=" border-b-slate-400 outline-none  bg-transparent"
              type="text"
              placeholder="Comment as yodha. . ."
            />
            <button className="lg:py-0.5 px-4 lg:rounded-md lg:bg-slate-400">
              Post
            </button>
          </div>
        )}
        
        {showEditModal && <EditPostModal setShowEditModal={setShowEditModal} postsData={postsData} setPostsData={setPostsData} postId={postData._id}/>}

      </div>
    </div>
  );
}

export default Card;
