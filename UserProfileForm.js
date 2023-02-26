import React, { useRef, useContext } from "react";

import classes from "./UserProfileForm.module.css";
import loginContext from "../store/login-context";

const UserProfileForm = () => {
  const loginCtx = useContext(loginContext);
  const nameRef = useRef();
  const imageRef = useRef();

  const profileSubmitHandler = async (event) => {
    event.preventDefault();

    if (loginCtx.isLoggedIn) {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCCkbbq5tYi_gSrQ7IJ1BoZ1I4iWWjMMHI",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: localStorage.getItem("idToken"),
              displayName: nameRef.current.value,
              imageUrl: imageRef.current.value,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          nameRef.current.value = "";
          imageRef.current.value = "";
          const data = await res.json();
          console.log(data);
        } else {
          const data = await res.json();
          throw data.error;
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={profileSubmitHandler}>
      <div className={classes.formHead}>
        <span>Contact Details</span>
        <button>Cancel</button>
      </div>
      <div className={classes.formBody}>
        <label>Full Name:</label>
        <input type="text" ref={nameRef} />
        <label>Profile Photo URL:</label>
        <input type="text" ref={imageRef} />
        <div className={classes.button}>
          <button type="submit">Update</button>
        </div>
      </div>
    </form>
  );
};

export default UserProfileForm;