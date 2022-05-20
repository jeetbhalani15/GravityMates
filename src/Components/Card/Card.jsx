import React, { useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { RiMoreFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import logo from "../../Assets/Images/logo.png";
import { useAuth } from "../../features/Auth/authSlice";
import { useDispatch } from "react-redux";
import {
  addBookmark,
  addCommentOnPost,
  deletePost,
  fetchDisLikePost,
  fetchLikePost,
  getPost,
  removeBookmark,
  usePosts,
} from "../../features/Posts/postSlice";
import EditPostModal from "../user-postEdit-modal/editPostModal";
import CommentCard from "../CommentCard/CommentCard";
import {Link} from "react-router-dom";

function Card({ postData }) {
  const [show, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [postsData, setPostsData] = useState({
    caption: postData?.caption,
    content: postData?.content,
    img: postData?.img,
  });
  const { token, user } = useAuth();
  const { bookmarks, posts } = usePosts();
  const dispatch = useDispatch();
  const [commentData, setComment] = useState({ text: "" });
  const postId = postData?._id;

  const isBookmarked = bookmarks.some(curr => curr === postId);


  const deletePostHandler = () => {
    dispatch(deletePost({ postId: postData?._id, token }));
    dispatch(getPost());
    setShowMenu(false);
  };

  const addCommentsHandler = () => {
    dispatch(addCommentOnPost({ postId, commentData, token }));
    setComment((pre) => ({ ...pre, text: "" }));
  };

  const likeHandler = () => {
    dispatch(fetchLikePost({token, postId}));
}

const dislikeHandler = () => {
    dispatch(fetchDisLikePost({token, postId}));
}

const addToBookmark = () => {
  dispatch(addBookmark({token, postId}));
}

const removeFromBookmark = () => {
  dispatch(removeBookmark({token, postId}));
}

  return (
    <div className=" flex items-center justify-center max-w-[39rem] hover:cursor-pointer">
      <div className="justify-center p-[0.6rem] max-w-xl border-zinc-400 rounded-[8px]  border-2 dark:text-[#b1b1b1] ">
        <div className=" relative flex items-center justify-between rounded-lg p-2 ">
          <div className="  w-12 flex items-center gap-2 p-1">
            <img className=" w-10 h-10 object-contain rounded-full" src={postData?.img} alt="logo" />
            <div className="flex flex-col">
              {postData?.firstName}
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
          <img
            className=" p-2 w-full lg:w-[30rem]"
            src={postData?.img}
            alt=""
          />
          <p className="p-4">{postData?.content}</p>
        </div>

        <div className="border-t border-slate-400">
          <div className="flex items-center justify-between p-4 lg:w-[30rem]">
            <div className="flex items-center gap-4 ">


              {
                postData?.likes?.likeCount > 0
                ?
                <BsHeartFill onClick={dislikeHandler} className='text-xl  cursor-pointer text-red-500  hover:scale-105'/>
                :
                <BsHeart onClick={likeHandler} className='text-xl text-black dark:text-white cursor-pointer hover:text-zinc-600 hover:scale-105'/>
                    }


              {/* <div onClick={() => setShowComments(!show)}>
                <FiMessageCircle size={20} />
              </div> */}
              <Link to={`/comments/${postData?.id}`}><div onClick={() => setShowComments(!show)}>
                <FiMessageCircle size={20} />
              </div>
              </Link>
              <div>
                <FiSend size={20} />
              </div>
            </div>
            
            {
              isBookmarked
               ?
               <BsBookmarkCheckFill onClick={removeFromBookmark} className='text-xl text-cyan-500 cursor-pointer hover:text-cyan-500 hover:scale-105'/>
                :
               <BsBookmark onClick={addToBookmark} className='text-xl text-white cursor-pointer hover:text-blue-500 hover:scale-105'/>
               }


          </div>

          <p className="font-bold text-sm pl-3 text-gray-300 dark:text-[#b1b1b1]">{postData?.likes?.likeCount} Likes</p>
          {
                postData?.likes?.likeCount > 0
                ?
                <>
                {
                    postData?.likes?.likedBy.map(liked => (
                        <p key={liked._id} className=' mt-[-1.3rem] p-4 font-bold text-sm text-grey-300 '><span className='font-bold text-black dark:text-white'>liked by </span> <Link to={`/profile/${liked.username}`}><span className=" text-sm">{liked.username}</span></Link></p>
                    ))
                }
                </>
                :
                <p className='mt-[-1.3rem] p-4 font-bold text-sm pl-3 text-gray-600 dark:text-[#b1b1b1]'>Be the first to like</p>

            }
             <p className='text-sm pl-3 mt-[-1rem] text-gray-300 p-[0.8rem]'><span className='font-bold text-white'>{postData?.username}</span> {postData?.caption}</p>
             <small className='text-gray-400 pl-3'>{postData?.createdAt}</small>
            


        </div>

        {/* { posts?.comments.map(items => <CommentCard items={items} /> )  }        */}
        {/* {posts.map((item) =>
          (item.comments.map(
            (comment) =>
               (
                <CommentCard key={comment.id} commentData={comment} />
              )
          ))
        )} */}


        {false && (
          <div className=" p-2 flex items-center gap-2 w-[28rem] ">
            <img className="w-8 rounded-full" src={logo} alt="logo" />
            <input
              className=" border-b-slate-400 outline-none  bg-transparent"
              type="text"
              placeholder="Comment as yodha. . ."
              onChange={(e) =>
                setComment((pre) => ({ ...pre, text: e.target.value }))
              }
            />
            <button
              className=" lg:ml-[10.5rem] lg:py-0.5 px-4 lg:rounded-md lg:bg-slate-400"
              onClick={() => addCommentsHandler()}
            >
              Post
            </button>
          </div>
        )}

        {showEditModal && (
          <EditPostModal
            setShowEditModal={setShowEditModal}
            postsData={postsData}
            setPostsData={setPostsData}
            postId={postData._id}
            setShowMenu={setShowMenu}
          />
        )}
      </div>
    </div>
  );
}

export default Card;
