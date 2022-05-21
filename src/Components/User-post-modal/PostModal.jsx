import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import logo from "../../Assets/Images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPost, usePosts } from "../../features/Posts/postSlice";
import { useAuth } from "../../features/Auth/authSlice";

function PostModal({ setShow }) {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { isLoading } = usePosts();
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [caption, setcaption] = useState("");
  const postData = {
    content: postContent,
    caption: caption,
    img: postImage,
  };

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };
  const handlePostImage = (e) => {
    let reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPostImage(reader.result);
      }
    };
  };
   
  // new post
  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ postData, token }));
    setShow(false);
  };
  
  return (
    <div className=" h-full w-full flex justify-center items-center bg-[#0000006b] z-40 absolute top-0">
      <form onSubmit={handleNewPostSubmit}>
        <div className=" relative flex gap-6 justify-center flex-col items-center rounded-lg border-slate-800 border-2 w-fit p-4 z-20  bg-[#edf7ff] lg:w-96 dark:bg-[#1a1919]">
          <h1 className=" text-xl text-[#019db1] font-bold mt-2 ">New Post</h1>
          <span className=" absolute top-[10px] right-[14px] dark:text-white hover:bg-slate-400 ">
            <IoIosClose onClick={() => setShow(false)} size={25} />
          </span>
          <div className="flex items-start gap-6">
            <div className="w-20 lg:w-22 ">
              <img
                className="rounded-full"
                src={userData.user?.img}
                alt="logo"
              />
              <img className="w-24 mt-8 rounded-[5px]" src={postImage} alt="" />
            </div>

            <div className="flex flex-col items-center gap-4">
              <input
                className="p-1"
                type="text"
                maxLength="100"
                onChange={(e) => setcaption(e.target.value)}
                placeholder="caption..."
                required
              />
              <textarea
                className=" w-full p-1"
                maxLength="120"
                type="text"
                rows={8}
                placeholder="whats happening ?"
                value={postContent}
                onChange={(e) => handleContentChange(e)}
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <label
              className="flex p-2 items-center gap-2 rounded-md bg-slate-400 dark:bg-[#8688885c] dark:text-white"
              htmlFor="image"
            >
              <BiImageAdd />
              Add Image
              <input
                type="file"
                accept="image/*"
                id="image"
                onChange={handlePostImage}
                className=" invisible w-0 p-0 "
              />
            </label>
            <button className="p-2 flex items-center gap-2 rounded-md  bg-slate-400 dark:bg-[#8688885c] dark:text-white">
              <MdPostAdd />
              {isLoading ? "add post..." : "add post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostModal;
