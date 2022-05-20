import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Login from "./Pages/AuthWidgets/Login/Login";
import Signup from "./Pages/AuthWidgets/Signup/Signup";
import SingleCommentPage from "./Pages/SingleCommentPage/SingleCommentPage";
import BookmarkPage from "./Pages/BookmarkPage/BookmarkPage";



function App() {
  return (
    <>
    <html className="dark">
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route  path="/home" element={<HomePage/>} />
      <Route  path="/profile/:username" element={<ProfilePage/>} />
      <Route  path="/comments/:postsId" element={<SingleCommentPage/>} />
      <Route  path="/bookmark" element={<BookmarkPage/>} />
      <Route  path="/login" element={<Login/>} />
      <Route  path="/signup" element={<Signup/>} />
    </Routes>
    </html>
    </>
    
  );
}

export default App;
