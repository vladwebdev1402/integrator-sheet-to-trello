import React from "react";
import st from "./ProfilePage.module.scss";
import { GoogleProfile } from "@/entities/user-google";
import { AuthByGoogle, LogoutGoogle } from "@/features/auth";

const ProfilePage = () => {
  return (
    <div className={`container ${st.profiles}`}>
      <GoogleProfile AuthByGoogle={AuthByGoogle} Logout={LogoutGoogle} />
    </div>
  );
};

export default ProfilePage;
