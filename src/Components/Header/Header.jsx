import React from "react";
import logo from "../../Assets/Images/logo.png";
import { ImSearch } from "react-icons/im";

function Header() {
  return (
    <div className=" lg:hidden flex items-center z-10 justify-around p-2 gap-3 w-full fixed top-0 bg-white">
      <div className="lg:hidden">G-Mates</div>
      <div className="flex items-center border-2 border-solid w-fit rounded-full bg-gray-200 lg:mr-80 ">
        <input className="border-none p-2 w-24 ml-3 outline-none text-xs bg-gray-200 rounded-full  xs:w-60 " />
        <ImSearch className="w-8 mr-2" />
      </div>
      <div className="w-8 lg:hidden">
        <img className="rounded-full" src={logo} alt="logo" srcset="" />
      </div>
    </div>
  );
}

export default Header;
