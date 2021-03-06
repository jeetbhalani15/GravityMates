import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { MdOutlineAddAPhoto } from "react-icons/md";
import logo from "../../Assets/Images/logo.png";
import { editUser } from "../../features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const EditProfileModal = ({ setShow, userImage, setUserImage }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const authUserData = useSelector((state) => state.user);
  const [userData, setUserData] = useState({ ...authUserData.user });
  const token = authUserData.token;

  const userDataChangeHandler = (e) => {
    setUserData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
 
  // edit user
  const updateUserDataHandler = (e) => {
    e.preventDefault();
    dispatch(editUser({ userData, token }));
    setShow(false);
  };

  // edit image
  const imageUploadhandler = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2)
        setUserData((pre) => ({ ...pre, img: reader.result }));
    };
  };

  return (
    <div className=" h-full w-full flex justify-center items-center bg-[#0000006b] z-40 absolute top-0">
      <form onSubmit={(e) => updateUserDataHandler(e)}>
        <div className=" relative flex gap-6 justify-center flex-col items-center rounded-lg border-slate-800 border-2 w-fit p-4 z-20  bg-slate-300 lg:w-96 dark:bg-[#1a1919] dark:text-white">
          <h1 className=" text-xl text-[#019db1] font-bold mt-2 ">
            Edit profile
          </h1>
          <span className=" absolute top-[10px] right-[14px] hover:bg-slate-400 ">
            <IoIosClose onClick={() => setShow(false)} size={25} />
          </span>
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="w-20 lg:w-18 ">
              <label className="flex" htmlFor="image">
                <img
                  className=" relative w-20 h-20 rounded-full"
                  src={userData.img}
                  alt="logo"
                />
                <span className="absolute top-36 right-40">
                  <MdOutlineAddAPhoto />
                </span>
                <input
                  className=" invisible m-0 p-0 "
                  onChange={(e) => imageUploadhandler(e)}
                  id="image"
                  accept="image/*"
                  type="file"
                />
              </label>
            </div>
            <div className="flex justify-center flex-col gap-4">
              <div className="flex items-center gap-2">
                <label className="p-1">Name:</label>
                <span className=" font-semibold">{`${userData.firstName} ${userData.lastName}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="p-1">username:</label>
                <span className=" font-semibold">{userData.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="p-1">Website:</label>
                <input
                  onChange={(e) => userDataChangeHandler(e)}
                  name="website"
                  value={userData.website}
                  className="p-1 dark:text-black"
                  type="text"
                  placeholder="link..."
                />
              </div>
              <div className="flex items-start gap-2">
                <label className="p-1">Bio:</label>
                <textarea
                  className=" w-full p-1 dark:text-black"
                  type="text"
                  name="bio"
                  rows={4}
                  onChange={(e) => userDataChangeHandler(e)}
                  value={userData.bio}
                  placeholder="tell something about you..."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className=" flex items-center gap-2 rounded-md p-2 bg-slate-400 dark:bg-[#8688885c]">
              <MdPostAdd />
              update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;
