import { Route, Routes } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
import UserProfile from "./pages/UserProfile";
function App() {
  return (
    <>
      <MainNavigation />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
      </Routes>
    </>
  );
}
export default App;