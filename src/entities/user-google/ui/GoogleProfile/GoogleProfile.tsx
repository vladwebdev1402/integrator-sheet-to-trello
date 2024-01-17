import React, { FC } from "react";
import st from "./GoogleProfile.module.scss";
import {
  ProfileAvatar,
  ProfileContainer,
  ProfileElement,
  useAppSelector,
} from "@/shared";

interface Props {
  AuthByGoogle: FC;
  Logout: FC;
}

const GoogleProfile: FC<Props> = ({ AuthByGoogle, Logout }) => {
  const { user } = useAppSelector((state) => state.AuthGoogleReducer);

  return (
    <ProfileContainer title="Google Account">
      <ProfileAvatar src={!!user ? user.avatar : ""} />
      <ProfileElement title={user !== null ? "Name" : ""}>
        {user !== null ? user.username : "You not authorized"}
      </ProfileElement>
      <ProfileElement
        isVisible={user === null}
        className={st.profile__gmail}
        title={"Gmail"}
      >
        {user !== null ? user.gmail : ""}
      </ProfileElement>
      <ProfileElement title={""}>
        {user === null && <AuthByGoogle />}
        {user !== null && <Logout />}
      </ProfileElement>
    </ProfileContainer>
  );
};

export default GoogleProfile;
