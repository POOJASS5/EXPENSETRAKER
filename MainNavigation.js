import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import loginContext from "../store/login-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const loginCtx = useContext(loginContext);

  const logoutHandler = () => {
    if (loginCtx.isLoggedIn) {
      loginCtx.logout();
    }
  };
  return (
    <div className={classes.mainNav}>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              User Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              onClick={logoutHandler}
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              {!loginCtx.isLoggedIn ? "Login" : "Logout"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default MainNavigation;