import React from "react";
import st from "./ProfilePage.module.scss";

import { GoogleProfile } from "@/entities/user-google";
import { TrelloProfile } from "@/entities/user-trello";
import {
  AuthByGoogle,
  AuthByTrello,
  LogoutGoogle,
  LogoutTrello,
} from "@/features/auth";

const ProfilePage = () => {
  return (
    <div className={`container ${st.profiles}`}>
      <GoogleProfile AuthByGoogle={AuthByGoogle} Logout={LogoutGoogle} />
      <TrelloProfile AuthByTrello={AuthByTrello} Logout={LogoutTrello} />
    </div>
  );
};

export default ProfilePage;
