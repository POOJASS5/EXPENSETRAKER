import { Route, Routes } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import Login from "./pages/Login";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <MainNavigation />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;