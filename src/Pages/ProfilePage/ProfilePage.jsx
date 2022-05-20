import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import logo from "../../Assets/Images/logo.png";
import Card from "../../Components/Card/Card";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import SuggestionCard from "../../Components/SuggestionCard/SuggestionCard";

import PostModal from "../../Components/User-post-modal/PostModal";
import EditProfileModal from "../../Components/User-profileEdit-modal/editProfileModal";
import {
  fetchAllUsersData,
  fetchFollowUser,
  fetchUnFollowUser,
  logoutUser,
  useAuth,
} from "../../features/Auth/authSlice";
import { deleteComment, getPost, usePosts } from "../../features/Posts/postSlice";

function ProfilePage() {
  const [show, setShow] = useState(false);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [userImage, setUserImage] = useState("https://i.imgur.com/2MVjicu.png");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();
  const { posts } = usePosts();
  const { token, allUsers, user } = useAuth();
  let currentUser = "";

  const userData = useSelector((state) => state.user);
  console.log(userData.user.username);

  useEffect(() => {
    dispatch(fetchAllUsersData());
    dispatch(getPost());
  }, []);
  console.log(username)

  const authUser = allUsers?.users?.find(
    (item) => item.username === user.username
  );
  const isFollowed = authUser?.following?.find(
    (item) => item.username === username
  );
  console.log(isFollowed)

  const findUser = userData.allUsers.users?.find(
    (user) => user.username === username
  );
  const postsCount = posts.filter(
    (item) => item.username === findUser.username
  );

  if (findUser?.username === userData.user?.username) {
    currentUser = userData.user;
  } else {
    currentUser = findUser;
  }
  const userId = findUser?._id;

  const logouthandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const followUserHandler = () => {
      console.log("hello")
    dispatch(fetchFollowUser({ token, userId }));
    console.log("hi")
  };

  const unFollowHandler = () => {
    dispatch(fetchUnFollowUser({ token, userId }));
  };
  return (
    <>
      {" "}
      <div className="relative flex justify-center bg-[#edf7ff] mt-[-1.5rem] dark:bg-[#00000082]">
        {/* // HEADER_SECTION */}
        <Header />
        {show && (
          <EditProfileModal
            setShow={setShow}
            userImage={userImage}
            setUserImage={setUserImage}
          />
        )}
        {showAddPostModal && <PostModal setShow={setShow} />}

        {/* BODY_SECTION POST CARD  */}
        <div className="mt-20 lg:mt-8 w-fit lg:p-8 lg:bg-[#69696933] lg:w-[43.2rem] dark:bg-[#000000ab]">
          <div className="lg:p-8 mt-[-3rem] dark:text-white">
            <div className="flex gap-3 lg:gap-6 items-center justify-center mt-4">
              <div className="w-20 lg:w-28 ">
                <img
                  className="block mx-auto bg-center bg-no-repeat bg-cover w-24 h-24 rounded-full border  shadow-lg"
                  src={currentUser?.img}
                  alt="logo"
                />
              </div>
              <div className="flex gap-4 flex-col p-2">
                <div className="flex items-center gap-4">
                  <div className="font-bold lg:text-xl lg:pr-2 ">
                    {currentUser?.username}
                  </div>

                  {/* <div>
                    <button
                      onClick={() => setShow(true)}
                      className=" p-1 rounded-md bg-slate-400 text-sm lg:p-2"
                    >
                      Edit profile
                    </button>
                  </div> */}

                  {findUser?.username === userData.user?.username ? (
                    <div>
                      <button
                        onClick={() => setShow(true)}
                        className=" p-1 rounded-md bg-slate-400 text-sm lg:p-2"
                      >
                        Edit profile
                      </button>
                    </div>
                  ) : (
                    <>
                      {isFollowed ? (
                        <button
                          onClick={unFollowHandler}
                          className="lg:p-2 lg:rounded-md lg:bg-slate-400"
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          onClick={followUserHandler}
                          className="lg:p-2 lg:rounded-md lg:bg-slate-400"
                        >
                          Follow +
                        </button>
                      )}
                    </>
                  )}

                  <div onClick={logouthandler}>
                    <AiOutlineLogout size={20} />
                  </div>
                </div>
                <div>
                  <div className="flex gap-1 lg:gap-6">
                    <span> Posts {postsCount.length}</span>
                    <span> followers {findUser?.followers.length}</span>
                    <span> following {findUser?.following.length}</span>
                  </div>
                </div>
                <div className=" text-slate-800 hover:cursor-pointer dark:text-slate-400">{currentUser?.website}</div>
              </div>
            </div>
            <div className="mt-2">
              <p className=" text-center">{currentUser?.bio}</p>
            </div>
          </div>
          <div className="lg:overflow-y-auto lg:h-[31.5rem]">
            {posts?.map(
              (item) =>
                item?.username === findUser?.username && (
                  <Card key={item?._id} postData={item} />
                )
            )}
            {/* : <>
           <div className='flex flex-col justify-center items-center'>
           <h1 className=' text-lg text-center font-bold'>Add Some Posts To view them here.</h1>
           <button className='p-3 rounded-md text-sm bg-gray-400' onClick={()=>setShowAddPostModal(true)}>Add new post</button></div></> } */}
          </div>
        </div>

        {/* //  NAVBAR_SECTION */}
        <Sidebar />
      </div>
      <SuggestionCard />
    </>
  );
}

export default ProfilePage;
