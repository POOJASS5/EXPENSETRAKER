import { Route, Routes, Navigate } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
import UserProfile from "./pages/UserProfile";
import Expenses from "./pages/Expenses";
import About from "./pages/About";
import ForgotPassword from "./components/ForgotPassword";
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return (
    <>
      <MainNavigation />
      <Routes>
        <Route path="/" exact element={<Navigate replace to="/home" />}></Route>
        <Route path="/home" element={<Home />}></Route>
        {isLoggedIn ? (
          <Route path="/expenses" element={<Expenses />} />
        ) : (
          <Route path="/expenses" element={<Navigate replace to="/login" />} />
        )}

        <Route path="/about" element={<About />} />

        {isLoggedIn ? (
          <Route path="/profile" element={<UserProfile />} />
        ) : (
          <Route path="/profile" element={<Navigate replace to="/login" />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}
export default App;