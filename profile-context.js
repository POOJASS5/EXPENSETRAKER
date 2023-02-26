import React, { useState } from "react";

const profileContext = React.createContext({
  name: "",
  photo: "",
  update: () => {},
});

export const ProfileContextProvider = (props) => {
  const [userProfile, setUserProfile] = useState({ name: "", photo: "" });

  const updateProfile = (item) => {
    setUserProfile({ name: item.name, photo: item.photo });
  };

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