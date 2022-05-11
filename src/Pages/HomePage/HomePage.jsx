import React from "react";
import {FaRegBell} from "react-icons/fa"
import {AiOutlineLogout} from "react-icons/ai"
import {ImSearch} from "react-icons/im"
import logo from "../../Assets/Images/logo.png"
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import Sidebar from "../../Components/SideBar/Sidebar";
import SuggestedCard from "../../Components/SuggestedCard/SuggestedCard";


function HomePage() {
  return (
    <>
      <div className="relative flex justify-center bg-[#edf7ff] mt-[-1.5rem]">
        {/* // HEADER_SECTION */}
        <Header />

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

      <div className=" hidden xs:hdden lg:flex lg:flex-col lg:w-80 lg:p-2 lg:gap-6 lg:absolute lg:top-2 lg:right-24 lg:z-20 lg:bg-zinc-200 lg:rounded-tr-3xl ">
        <div className="lg:flex lg:items-center lg:justify-end lg:gap-2 lg:p-4">
          <div className=" hidden xs:hidden lg:block">
            <AiOutlineLogout size={20} />
          </div>
          <div className=" hidden xs:hidden lg:block">
            <FaRegBell size={20} />
          </div>
          <img
            className="lg:rounded-full lg:ml-2 lg:w-10"
            src={logo}
            alt="logo"
            srcset=""
          />
        </div>
        <h1 className=" xs: hidden lg:text-lg lg:flex lg:justify-center">
          Popular Activities
        </h1>
          <SuggestedCard/>
          <SuggestedCard/>
          <SuggestedCard/>
      </div>
    </>
  );
}

export default HomePage;
