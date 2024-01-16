import React, { FC } from "react";
import st from "./GoogleProfile.module.scss";
import { useAppSelector } from "@/shared";
import { Avatar } from "@mui/material";

interface Props {
  AuthByGoogle: FC;
  Logout: FC;
}

const GoogleProfile: FC<Props> = ({ AuthByGoogle, Logout }) => {
  const { user } = useAppSelector((state) => state.AuthGoogleReducer);

  return (
    <div className={`container ${st.profile}`}>
      <Avatar
        src={!!user ? user.avatar : ""}
        sx={{ width: "140px", height: "140px" }}
      />
      <div className={st.profile__body}>
        <div className={st.profile__item}>
          {user !== null ? user.username : "You not authorized"}
        </div>
        {user !== null && (
          <div className={`${st.profile__item} ${st.profile__gmail}`}>
            {user.gmail}
          </div>
        )}

        <div className={st.profile__item}>
          {user === null && <AuthByGoogle />}
          {user !== null && <Logout />}
        </div>
      </div>
    </div>
  );
};

export default GoogleProfile;
