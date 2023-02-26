import { Route, Routes, Navigate } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
import UserProfile from "./pages/UserProfile";
import Product from "./pages/Product";
import About from "./pages/About";
import { useContext } from "react";
import loginContext from "./store/login-context";
function App() {
  const loginCtx = useContext(loginContext);
  return (
    <>
      <MainNavigation />
      <Routes>
        <Route path="/" exact element={<Navigate replace to="/home" />}></Route>
        <Route path="/home" element={<Home />}></Route>
        {loginCtx.isLoggedIn ? (
          <Route path="/" exact element={<Product />} />
        ) : (
          <Route path="/product" element={<Navigate replace to="/login" />} />
        )}

        <Route path="/about" element={<About />} />

        {loginCtx.isLoggedIn ? (
          <Route path="/profile" element={<UserProfile />} />
        ) : (
          <Route path="/profile" element={<Navigate replace to="/login" />} />
        )}

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
export default App;