import React from "react";
import {ImSearch} from "react-icons/im"
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import Sidebar from "../../Components/SideBar/Sidebar";
import PostModal from "../../Components/User-post-modal/PostModal";
import SuggestionCard from "../../Components/SuggestionCard/SuggestionCard";



function HomePage() {
  return (
    <>
      <div className="relative flex justify-center bg-[#edf7ff] mt-[-1.5rem]">
        {/* // HEADER_SECTION */}
        <Header />
       {false && <PostModal/>}

        {/* BODY_SECTION POST CARD  */}
        <div className="mt-8 lg:p-8 lg:bg-[#69696933] lg:w-[43.7rem]">
          <div className="lg:flex lg:items-center justify-around lg:mb-8 lg:sticky">
            <div className=" hidden lg:flex lg:items-center border-2 border-solid w-fit rounded-full bg-gray-200  lg:mt-2">
              <input className="border-none p-2 w-24 ml-3 outline-none text-xs bg-gray-200 rounded-full  xs:w-60 " />
              <ImSearch className="w-8 mr-2" />
            </div>
            <div className="lg:text-lg lg:text-sky-900 lg:font-bold">
              Hi,Yodha
            </div>
          </div>
          <div className=" lg:overflow-y-auto lg:h-[37.8rem]">
            <Card />
            <Card />
            <Card />
            <Card />
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
