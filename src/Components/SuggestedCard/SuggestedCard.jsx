import React from "react";
import logo from "../../Assets/Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchFollowUser,
  fetchUnFollowUser,
  useAuth,
} from "../../features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../features/Posts/postSlice";

function SuggestedCard({ users }) {
  const { token, allUsers, user } = useAuth();
  const dispatch = useDispatch();
  const userId = users._id;

  const authUser = allUsers.users.find((item) => item.username === user.username);
  const isFollowed = authUser?.following.find(
    (item) => item.username === users.username
  );

  const followUserHandler = () => {
    dispatch(fetchFollowUser({ token, userId }));
  };

  const unFollowHandler = () => {
    dispatch(fetchUnFollowUser({ token, userId }));
  };
  return (
    <div className="lg:flex lg:items-center p-2 lg:justify-evenly hover:bg-[aliceblue] dark:hover:bg-[#5556565c] hover:cursor-pointer">
      <img
        className="lg:w-12 h-12 rounded-full"
        src={users.img}
        alt="user-img"
      />
      <div className="lg:mr-4">
        <h1 className="lg:text-lg">{users.firstName}</h1>
        <div>
          <small>{users.username}</small>
        </div>
      </div>
      {isFollowed ? (
        <button
          onClick={unFollowHandler}
          className="lg:p-2 lg:rounded-md lg:bg-slate-300 dark:bg-[#8688885c]"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={followUserHandler}
          className="lg:p-2 lg:rounded-md lg:bg-slate-300 dark:bg-[#8688885c]"
        >
          Follow +
        </button>
      )}
    </div>
  );
}

export default SuggestedCard;
