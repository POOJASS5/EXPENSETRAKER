import React, { useState, useEffect, useContext } from "react";
import loginContext from "./login-context";
const profileContext = React.createContext({
  name: "",
  photo: "",
  update: () => {},
});
export const ProfileContextProvider = (props) => {
  const [userProfile, setUserProfile] = useState({ name: "", photo: "" });
  const loginCtx = useContext(loginContext);
  const updateProfile = async () => {
    try {
      // console.log('called');
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAQs7bI7d64xgfIx12vFZcTVaM1c4_k08A",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: JSON.parse(localStorage.getItem("idToken")).idToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok && data.users[0].displayName && data.users[0].photoUrl) {
        setUserProfile({
          name: data.users[0].displayName,
          photo: data.users[0].photoUrl,
        });
      } else {
        throw data.error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const { isLoggedIn } = loginCtx;
  useEffect(() => {
    if (isLoggedIn) {
      updateProfile();
    }
  }, [isLoggedIn]);
  const profileContextValue = {
    name: userProfile.name,
    photo: userProfile.photo,
    update: updateProfile,
  };
  return (
    <profileContext.Provider value={profileContextValue}>
      {props.children}
    </profileContext.Provider>
  );
};
export default profileContext;