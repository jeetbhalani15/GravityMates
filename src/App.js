import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Login from "./Pages/AuthWidgets/Login/Login";
import Signup from "./Pages/AuthWidgets/Signup/Signup";



function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route  path="/home" element={<HomePage/>} />
      <Route  path="/profile/:username" element={<ProfilePage/>} />
      <Route  path="/login" element={<Login/>} />
      <Route  path="/signup" element={<Signup/>} />
    </Routes>
    
  );
}

export default App;
