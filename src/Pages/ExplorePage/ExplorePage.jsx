import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../../Components/Card/Card";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import SuggestionCard from "../../Components/SuggestionCard/SuggestionCard";
import {
  getPost,
  sortByLatest,
  sortByOldest,
  sortByTrending,
  usePosts,
} from "../../features/Posts/postSlice";

const ExplorePage = () => {
  const dispatch = useDispatch();
  const { posts } = usePosts();
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    dispatch(getPost());
  }, []);

//   sort by trending
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
      <div className="relative flex justify-center bg-[#edf7ff] mt-[-1.5rem] dark:bg-[#000000ab]">
        {/* // HEADER_SECTION */}
        <Header />

        {/* BODY_SECTION POST CARD  */}
        <div className="mt-20 lg:mt-8 w-fit lg:p-8 lg:bg-[#69696933] lg:w-[43.2rem] dark:bg-[#000000ab] dark:text-white">
          <h1 className="text-2xl text-[#019db1] font-bold">Explore</h1>
          <div className="lg:overflow-y-auto lg:h-[38.8rem] lg:mt-8">
            <div className="flex justify-center text-white font-bold gap-3">
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

            <div className=" flex flex-col gap-12 mt-4">
              {posts.map((post) => (
                <Card key={post.id} postData={post} />
              ))}
            </div>

            {/* //  NAVBAR_SECTION */}
            <Sidebar />
          </div>
          <SuggestionCard />
        </div>
      </div>
    </>
  );
};

export default ExplorePage;
