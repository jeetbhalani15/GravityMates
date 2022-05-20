import { React, useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import Header from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
import Sidebar from "../../Components/SideBar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import SuggestionCard from "../../Components/SuggestionCard/SuggestionCard";
import {
  addCommentOnPost,
  deleteComment,
  getPost,
  usePosts,
} from "../../features/Posts/postSlice";
import { fetchAllUsersData, useAuth } from "../../features/Auth/authSlice";
import { fetchPosts } from "../../features/Posts/postSlice";
import CommentCard from "../../Components/CommentCard/CommentCard";
import logo from "../../Assets/Images/logo.png";
import EditCommentModal from "../../Components/EditCommentModal/EditCommentModal";

const SingleCommentPage = () => {
  const { postsId } = useParams();
  const dispatch = useDispatch();
  const { posts } = usePosts();
  const { token } = useAuth();
  const findPost = posts.find((post) => post.id === postsId);
  const postId = findPost?._id;
  const [commentData, setCommentData] = useState({text:""});
  const [recentComment, setRecentComent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addCommentsHandler = (e) => {
      e.preventDefault();
    dispatch(addCommentOnPost({ postId, commentData, token }));
    setCommentData({text:""});
  };

  useEffect(() => {
    dispatch(fetchAllUsersData);
    dispatch(getPost());
  }, []);

  const editHadnler = (comment, commentsId) => {
    setShowModal(true);
    setRecentComent({text : comment, commentId : commentsId});
  }

   const deleteCommentHandler = (commentId) => {
    dispatch(deleteComment({token, postId, commentId}));
   }
  return (
    <>
      {" "}
      <div className="relative flex justify-center bg-[#edf7ff] mt-[-1.5rem] dark:bg-[#000000ab]">
        {/* // HEADER_SECTION */}
        <Header />
        {
            showModal
            &&
            <EditCommentModal setShowModal={setShowModal}  recentComment={recentComment} postId={findPost?._id}  />
        }


        {/* BODY_SECTION POST CARD  */}
        <div className="mt-20 lg:mt-8 w-fit lg:p-8 lg:bg-[#69696933] lg:w-[43.2rem] dark:bg-[#000000ab] dark:text-white">
          <h1 className="text-2xl font-bold text-[#019db1]">Commnets</h1>
          <div className="lg:overflow-y-auto lg:h-[38.8rem] lg:mt-8">
            {posts?.map(
              (items) =>
                items.id === postsId && (
                  <Card key={items._id} postData={items} />
                )
            )}
           <div className="flex flex-col items-start ml-20 mt-6">
               <form onSubmit={(e) => addCommentsHandler(e)}>
            <div className=" p-2 flex items-center gap-2 w-[28rem] border-b-2 border-[#8080806e] ">
              <img className="w-8 rounded-full" src={logo} alt="logo" />
              <input
                className=" border-b-slate-400 outline-none  bg-transparent"
                type="text"
                placeholder="Comment as yodha. . ."
                onChange={(e) =>
                  setCommentData((pre) => ({ ...pre, text: e.target.value }))
                }
                required
              />
              <button
                className=" lg:ml-[9.2rem] lg:py-0.5 px-4 lg:rounded-md lg:bg-slate-400 dark:bg-[#8688885c]"
              >
                Post
              </button>
            </div>
            </form>
             <div className="flex flex-col items-start">
            {findPost?.comments?.map((comment) => (
              <CommentCard commentData={comment} setShowModal={setShowModal} editHadnler={editHadnler} deleteCommentHandler={deleteCommentHandler}/>
            ))}
            </div>
            </div>
          </div>
        </div>

        {/* //  NAVBAR_SECTION */}
        <Sidebar />
      </div>
      <SuggestionCard />
    </>
  );
};

export default SingleCommentPage;
