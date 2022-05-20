import React, { useEffect, useState } from "react";
import {ImSearch} from "react-icons/im"
import {VscDiffAdded} from "react-icons/vsc"
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import Sidebar from "../../Components/SideBar/Sidebar";
import PostModal from "../../Components/User-post-modal/PostModal";
import SuggestionCard from "../../Components/SuggestionCard/SuggestionCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersData, useAuth } from "../../features/Auth/authSlice";
import { getPost, sortByLatest, sortByOldest, sortByTrending, usePosts } from "../../features/Posts/postSlice";



function HomePage() {
  const [show,setShow] = useState(false)
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user)
  const {posts} = usePosts();
  const postData = useSelector(store => store.post);
  const {allUsers} = useAuth();
  // const posts = useSelector(state=> state.post);
  const [activeFilter, setActiveFilter] = useState("");
  const adminUser = allUsers?.users?.find(item => item.username === userData.user?.username);

  const showPosts = postData.posts.filter(item => 
    item.username === adminUser?.username 
    || 
    adminUser?.following.some(follower => follower.username === item.username));

  useEffect(()=>{
    dispatch(fetchAllUsersData())
    dispatch(getPost());
  },[])

  const sortByTrandingHandler = () => {
    dispatch(sortByTrending());
    setActiveFilter("trending");
}

const sortByNewestHandler = () => {
    dispatch(sortByLatest());
    setActiveFilter("newest");
}

const sortByOldestHandler = () => {
    dispatch(sortByOldest());
    setActiveFilter("oldest");
}


  return (
    <>
      <div className="relative flex justify-center bg-[#edf7ff] mt-[-1.5rem] dark:bg-[#000000ab]">
        {/* // HEADER_SECTION */}
        <Header />
       {show && <PostModal setShow={setShow}/>}

        {/* BODY_SECTION POST CARD  */}
        <div className="mt-8 lg:p-8 lg:bg-[#69696933] lg:w-[43.7rem] dark:bg-[#000000ab]">
          <div className="lg:flex lg:items-center justify-around lg:mb-8 lg:sticky">
            <div className=" hidden lg:flex lg:items-center border-2 border-solid w-fit rounded-full bg-gray-200  lg:mt-2">
              <input className="border-none p-2 w-24 ml-3 outline-none text-xs bg-gray-200 rounded-full  xs:w-60 " />
              <ImSearch className="w-8 mr-2" />
            </div>
            <div className=" flex items-center gap-3 hover:cursor-pointer lg:text-lg text-[#019db1] lg:font-bold">
              {`Hi,${userData.user?.username}`}
              <div>
              <VscDiffAdded className="dark:text-white" onClick={()=> setShow(true)}  size={20}/>
            </div>
            </div>
          
          </div>
            
       <div className="flex justify-center text-white font-bold gap-3">
                        <button onClick={sortByTrandingHandler} className={`hover:bg-cyan-500 dark:bg-[#4848487d] border-b-4 ${activeFilter === "trending" && "border-[#019db1]"} text-white text-center py-1 px-4 rounded`}>Trending</button>
                        <button onClick={sortByNewestHandler}  className={`hover:bg-cyan-500 dark:bg-[#4848487d] border-b-4 ${activeFilter === "newest" && "border-[#019db1]"} text-white text-center py-1 px-4 rounded`}>Newest</button>
                        <button onClick={sortByOldestHandler}  className={`hover:bg-cyan-500 dark:bg-[#4848487d] border-b-4 ${activeFilter === "oldest" && "border-[#019db1]"} text-white text-center py-1 px-4 rounded`}>Oldest</button>
                    </div>
          <div className=" flex flex-col gap-6 lg:overflow-y-auto mt-8 lg:h-[33.6rem]">
          
            {posts?.map((items)=> <Card key={items._id} postData={items}/>)}
          </div>
        </div>

        {/* //  NAVBAR_SECTION */}
        <Sidebar />
      </div>
      <SuggestionCard/>


    
    </>
  );
}

export default HomePage;
