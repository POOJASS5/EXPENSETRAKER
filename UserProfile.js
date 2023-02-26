import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./UserProfile.module.css";
import UserProfileForm from "../components/UserProfileForm";

const UserProfile = () => {
  const [profile, setProfile] = useState(false);
  const profileHandler = () => {
    setProfile((preState) => {
      return !preState;
    });
  };

  if (!profile) {
    return (
      <div className={classes.mainProfile}>
        <span className={classes.welcome}>
          Welcome to Expense Tracker...!!!
        </span>
        <span className={classes.profile}>
          <span>Your profile is incomplete.</span>
          <Link to="/profile" onClick={profileHandler}>
            <b> Complete now</b>
          </Link>
        </span>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.mainProfile}>
        <span className={classes.welcome}>
          Winners never quit, Quitters never win...!!!
        </span>
        <span className={classes.profile}>
          <span>
            Your profile is <b>64%</b> completed. A complete profile has a
            higher chance of landing a job.
          </span>
          <Link to="/profile" onClick={profileHandler}>
            <b> Complete now</b>
          </Link>
        </span>
      </div>
      <UserProfileForm />
    </React.Fragment>
  );
};

export default UserProfile;