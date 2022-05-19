import {React, useEffect} from "react";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import logo from "../../Assets/Images/logo.png";
import SuggestedCard from "../SuggestedCard/SuggestedCard";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsersData,
  logoutUser,
  useAuth,
} from "../../features/Auth/authSlice";
import { getPost } from "../../features/Posts/postSlice";
import { users } from "../../backend/db/users";

function SuggestionCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const authUser = useSelector(store => store.user);
  const { allUsers } = useAuth();
  console.log(allUsers)

  useEffect(() => {
    dispatch(fetchAllUsersData());
    dispatch(getPost());
  }, []);

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  console.log(user.username)
  return (
    <div className=" hidden xs:hdden lg:flex lg:flex-col lg:w-80 lg:p-2 lg:gap-3 lg:absolute lg:top-2 lg:right-24 lg:z-20 lg:bg-zinc-200 lg:rounded-tr-3xl ">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-2 lg:p-4 hover:cursor-pointer">
        <div className=" hidden xs:hidden lg:block">
          <AiOutlineLogout onClick={logoutHandler} size={20} />
        </div>
        <div className=" hidden xs:hidden lg:block">
          <FaRegBell size={20} />
        </div>
        <Link to={"/login"}>
          <img
            className="lg:rounded-full lg:ml-2 lg:w-10"
            src={user.user?.img}
            alt="logo"
            srcset=""
          />
        </Link>
      </div>
      <h1 className=" xs: hidden lg:text-lg lg:flex lg:justify-center">
        Popular Activities
      </h1>
      <div>
      {allUsers.users?.map(
        (item) =>
          item?.username !== authUser.user?.username && (
            <Link to={`/profile/${item?.username}`}><SuggestedCard key={item?._id} users={item} /></Link>
          )
      )}
      </div>
    </div>
  );
}

export default SuggestionCard;
