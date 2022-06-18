import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { VscDiffAdded } from "react-icons/vsc";
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import Sidebar from "../../Components/SideBar/Sidebar";
import PostModal from "../../Components/User-post-modal/PostModal";
import SuggestionCard from "../../Components/SuggestionCard/SuggestionCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersData, useAuth } from "../../features/Auth/authSlice";
import logo from "../../Assets/Images/logo.png"
import {
  getPost,
  sortByLatest,
  sortByOldest,
  sortByTrending,
  usePosts,
} from "../../features/Posts/postSlice";
import SearchUserBox from "../../Components/SearchUserBox/SearchUserBox";

function ExplorePage() {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserBox, setShowUSerBox] = useState(false)
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { posts } = usePosts();
  const postData = useSelector((store) => store.post);
  const { allUsers } = useAuth();
  // const posts = useSelector(state=> state.post);
  const [activeFilter, setActiveFilter] = useState("");
  const adminUser = allUsers?.users?.find(
    (item) => item.username === userData.user?.username
  );

  const showPosts = postData.posts.filter(
    (item) =>
      item.username === adminUser?.username ||
      adminUser?.following.some(
        (follower) => follower.username === item.username
      )
  );

  useEffect(() => {
    dispatch(fetchAllUsersData());
    dispatch(getPost());
  }, []);

  // sort by trending
  const sortByTrandingHandler = () => {
    dispatch(sortByTrending());
    setActiveFilter("trending");
  };

  // sort by newest
  const sortByNewestHandler = () => {
    dispatch(sortByLatest());
    setActiveFilter("newest");
  };

  // sort by oldest
  const sortByOldestHandler = () => {
    dispatch(sortByOldest());
    setActiveFilter("oldest");
  };
  return (
    <>
    <div className=" xl:h-[104vh] relative flex justify-center bg-[#edf7ff] mt-[-1.5rem] dark:bg-[#000000ab]">
        {/* // HEADER_SECTION */}
        <Header />
        {show && <PostModal setShow={setShow} />}

        {/* BODY_SECTION POST CARD  */}
        <div className=" lg:h-screen mt-20 lg:mt-8 w-screen lg:p-8 bg-[#69696933] lg:w-[43.1rem] dark:bg-[#000000ab]">
        <h1 className="text-2xl text-[#019db1] font-bold">Explore</h1>

          {showUserBox && <div className=" absolute z-10 top-[15%] left-[35%] flex flex-col gap-1 bg-zinc-800 w-fit p-2 overflow-y-auto h-[14rem] ">
          <SearchUserBox searchQuery={searchQuery}/>
          </div>}



          <div className=" xl:mt-12 flex justify-center text-white font-bold gap-3">
            <button
              onClick={sortByTrandingHandler}
              className={`hover:bg-cyan-500 dark:bg-[#4848487d] border-b-4 ${
                activeFilter === "trending" && "border-[#019db1]"
              } text-white text-center py-1 px-4 rounded`}
            >
              Trending
            </button>
            <button
              onClick={sortByNewestHandler}
              className={`hover:bg-cyan-500 dark:bg-[#4848487d] border-b-4 ${
                activeFilter === "newest" && "border-[#019db1]"
              } text-white text-center py-1 px-4 rounded`}
            >
              Newest
            </button>
            <button
              onClick={sortByOldestHandler}
              className={`hover:bg-cyan-500 dark:bg-[#4848487d] border-b-4 ${
                activeFilter === "oldest" && "border-[#019db1]"
              } text-white text-center py-1 px-4 rounded`}
            >
              Oldest
            </button>
          </div>
          <div className=" xl:h-[56.8rem] flex flex-col gap-6 lg:overflow-y-auto mt-8 lg:h-[37.6rem]">
            {posts?.map((items) => (
              <Card key={items._id} postData={items} />
            ))}
          </div>
        </div>

        {/* //  NAVBAR_SECTION */}
        <Sidebar setShow={setShow} />
      </div>
      <SuggestionCard />
    </>
  );
};

export default ExplorePage;
