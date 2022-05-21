import React from "react";
import Card from "../../Components/Card/Card";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import SuggestionCard from "../../Components/SuggestionCard/SuggestionCard";
import { usePosts } from "../../features/Posts/postSlice";

const BookmarkPage = () => {
  const { bookmarks, posts } = usePosts();
  const bookmarkeAllPosts = posts.filter((currPost) =>
    bookmarks.some((curr) => curr === currPost._id)
  );
  return (
    <>
      <div className="relative flex justify-center bg-[#edf7ff] mt-[-1.5rem] dark:bg-[#000000ab]">
        {/* // HEADER_SECTION */}
        <Header />

        {/* BODY_SECTION POST CARD  */}
        <div className="mt-20 lg:mt-8 w-fit lg:p-8 lg:bg-[#69696933] lg:w-[43.2rem] dark:bg-[#000000ab] dark:text-white">
          <h1 className="text-2xl text-[#019db1] font-bold">Bookmarks</h1>
          <div className="lg:overflow-y-auto lg:h-[38.8rem] lg:mt-8">
            {bookmarks.length === 0 ? (
              <h1 className="text-white font-bold text-2xl mt-5">
                Nothing in bookmarks
              </h1>
            ) : (
              <div className=" flex flex-col gap-8 mt-4">
                {bookmarkeAllPosts.map((posts) => (
                  <Card key={posts.id} postData={posts} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* //  NAVBAR_SECTION */}
        <Sidebar />
      </div>
      <SuggestionCard />
    </>
  );
};

export default BookmarkPage;
