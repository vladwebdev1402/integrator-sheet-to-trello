import React, { FC } from "react";
import st from "./GoogleProfile.module.scss";
import {
  ProfileAvatar,
  ProfileContainer,
  ProfileElement,
  useAppSelector,
} from "@/shared";
import ProfileError from "@/shared/ui/Profile/ProfileError";

interface Props {
  AuthByGoogle: FC;
  Logout: FC;
}

const GoogleProfile: FC<Props> = ({ AuthByGoogle, Logout }) => {
  const { user, error } = useAppSelector((state) => state.AuthGoogleReducer);

  return (
    <ProfileContainer title="Google Account">
      <ProfileAvatar src={!!user ? user.avatar : ""} />
      <ProfileElement title={user !== null ? "Name" : ""}>
        {user !== null ? user.username : "You not authorized in Google"}
      </ProfileElement>
      <ProfileElement
        isVisible={!!user}
        className={st.profile__gmail}
        title={"Gmail"}
      >
        {user !== null ? user.gmail : ""}
      </ProfileElement>
      <ProfileElement title={""} className={st.btn}>
        {user === null && <AuthByGoogle />}
        {user !== null && <Logout />}
      </ProfileElement>
      <ProfileError error={error} />
    </ProfileContainer>
  );
};

export default GoogleProfile;
