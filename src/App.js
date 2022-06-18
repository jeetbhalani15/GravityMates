import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Login from "./Pages/AuthWidgets/Login/Login";
import Signup from "./Pages/AuthWidgets/Signup/Signup";
import SingleCommentPage from "./Pages/SingleCommentPage/SingleCommentPage";
import BookmarkPage from "./Pages/BookmarkPage/BookmarkPage";
import ExplorePage from "./Pages/ExplorePage/ExplorePage";
import { Toaster } from "react-hot-toast";
import { Page404 } from "./Pages/Page404/Page404";
import { LandingPage } from "./Pages/LandingPage/LandingPage";



function App() {
  return (
    <>
     <Toaster
      position="top-center"
      reverseOrder={true}
    />
    <html className="dark">
    <Routes>
      <Route exact  path="/" element={<LandingPage/>} />
      <Route  path="/home" element={<HomePage/>} />
      <Route  path="/profile/:username" element={<ProfilePage/>} />
      <Route  path="/comments/:postsId" element={<SingleCommentPage/>} />
      <Route  path="/bookmark" element={<BookmarkPage/>} />
      <Route  path="/explore" element={<ExplorePage/>} />
      <Route  path="/login" element={<Login/>} />
      <Route  path="/signup" element={<Signup/>} />

      <Route  path="*" element={<Page404/>} />

    </Routes>
    </html>
    </>
    
  );
}

export default App;
