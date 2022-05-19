import React from "react";
import logo from "../../Assets/Images/logo.png"

function SuggestedCard() {
  return (
    <div className="lg:flex lg:items-center p-2 lg:justify-evenly hover:bg-[aliceblue] hover:cursor-pointer">
      <img
        className="lg:rounded-full lg:ml-2 lg:w-10"
        src={logo}
        alt="logo"
      />
      <div className="lg:mr-4">
        <h1 className="lg:text-lg">Yodha</h1>
        <div>
          <small>@yodha777</small>
        </div>
      </div>
      <div>
        <button className="lg:p-2 lg:rounded-md lg:bg-slate-300">
          Follow +
        </button>
      </div>
    </div>
  );
}

export default SuggestedCard;
