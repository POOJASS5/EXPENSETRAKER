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
  const themeMode = useSelector((state) => state.theme.theme);
  return (
    <div className={themeMode === "dark" ? "dark" : ""}>
      <MainNavigation />
      <Routes>
        <Route path="/" exact element={<Navigate replace to="/home" />}></Route>
        <Route path="/home" element={<Home />}></Route>

        <Route
          path="/expenses"
          element={isLoggedIn ? <Expenses /> : <Navigate to="/login" replace />}
        />

        <Route path="/about" element={<About />} />

        <Route
          path="/profile"
          element={
            isLoggedIn ? <UserProfile /> : <Navigate to="/login" replace />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;