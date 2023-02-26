import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import loginContext from "../store/login-context";

import classes from "./Login.module.css";
const Login = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const loginCtx = useContext(loginContext);

  const accountHandler = () => {
    setHaveAccount((prevState) => {
      return !prevState;
    });
  };
  let url;
  if (haveAccount) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCkbbq5tYi_gSrQ7IJ1BoZ1I4iWWjMMHI";
  } else {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCkbbq5tYi_gSrQ7IJ1BoZ1I4iWWjMMHI";
  }
  const loginFormHandler = async (e) => {
    e.preventDefault();
    if (!haveAccount) {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        return alert("password and confirm password are not same");
      }
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log("User Logged-In");
        localStorage.setItem("idToken", data.idToken);
        setHaveAccount(true);
        loginCtx.login();
      } else {
        const data = await res.json();
        throw data.error;
      }
    } catch (err) {
      alert(err.message);
    }
  };
  if (loginCtx.isLoggedIn) {
    return (
      <div className={classes.mainProfile}>
        <span className={classes.welcome}>
          Welcome to Expense Tracker...!!!
        </span>
        <span className={classes.profile}>
          <span>Your profile is incomplete.</span>
          <Link to="/profile">
            <b> Complete now</b>
          </Link>
        </span>
      </div>
    );
  }

  return (
    <div className={classes.mainDiv}>
      <form className={classes.form} onSubmit={loginFormHandler}>
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        {!haveAccount && (
          <input
            type="password"
            placeholder="confirm password"
            ref={confirmPasswordRef}
          />
        )}
        <button type="submit">{haveAccount ? "Login" : "Sign Up"}</button>
        {haveAccount ? <Link to="/">Forgot Password</Link> : ""}
      </form>
      <div className={classes.login} onClick={accountHandler}>
        {haveAccount
          ? `Don't have an account? Sign Up`
          : `Have an account? Sign In`}
      </div>
    </div>
  );
};
export default Login;