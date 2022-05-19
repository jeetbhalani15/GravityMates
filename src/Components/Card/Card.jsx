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
import {
  addCommentOnPost,
  deletePost,
  getPost,
  usePosts,
} from "../../features/Posts/postSlice";
import EditPostModal from "../user-postEdit-modal/editPostModal";
import CommentCard from "../CommentCard/CommentCard";

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
  const { posts } = usePosts();
  const dispatch = useDispatch();
  const [commentData, setComment] = useState({ text: "" });
  const postId = postData._id;
  console.log(posts);
  const deletePostHandler = () => {
    dispatch(deletePost({ postId: postData?._id, token }));
    dispatch(getPost());
    setShowMenu(false);
  };

  const addCommentsHandler = () => {
    dispatch(addCommentOnPost({ postId, commentData, token }));
    setComment((pre) => ({ ...pre, text: "" }));
  };

  return (
    <div className=" flex items-center justify-center max-w-[39rem] hover:cursor-pointer">
      <div className="justify-center p-0.5 max-w-xl border-zinc-400 rounded-[8px]  border-2 ">
        <div className=" relative flex items-center justify-between rounded-lg p-2 ">
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

        {/* { posts?.comments.map(items => <CommentCard items={items} /> )  }        */}
        {posts.map((item) =>
          item.comments.map(
            (comment) =>
               ((item?.username === postData?.username) &&
                <CommentCard key={comment.id} commentData={comment} />
              )
          )
        )}

        {show && (
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
