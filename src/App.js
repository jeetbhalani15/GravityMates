import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";



function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage/>} />
      <Route  path="/profile" element={<ProfilePage/>} />
    </Routes>
    
  );
}

export default App;
