import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginActions } from "../store/loginSlice";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const expenseList = useSelector((state) => state.expense.expenses);

  let expenseAmount = 0;
  expenseList.forEach((expense) => {
    expenseAmount += +expense.amount;
  });

  const logoutHandler = () => {
    dispatch(loginActions.logout());
    navigate("/login");
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
              to="/expenses"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Expenses
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
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={classes.button}>
        {expenseAmount > 10000 && <button>Activate Premium</button>}
        {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
      </div>
    </div>
  );
};
export default MainNavigation;