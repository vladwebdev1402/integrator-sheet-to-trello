import React, { FC } from "react";
import st from "./TrelloProfile.module.scss";

import {
  ProfileAvatar,
  ProfileContainer,
  ProfileElement,
  ProfileError,
  useAppSelector,
} from "@/shared";

interface Props {
  AuthByTrello: FC;
  Logout: FC;
}

const TrelloProfile: FC<Props> = ({ AuthByTrello, Logout }) => {
  const { user, error } = useAppSelector((state) => state.AuthTrelloReducer);

  return (
    <ProfileContainer title="Trello Account">
      <ProfileAvatar src={user?.avatar ?? ""} />
      <ProfileElement title={!!user ? "Name" : ""}>
        {user !== null ? user.username : "You not authorized in Trello"}
      </ProfileElement>
      <ProfileElement isVisible={!!user} title={"Boards"}>
        {user ? user.boards.length : ""}
      </ProfileElement>
      <ProfileElement isVisible={!!user && user.bio !== ""} title={"About"}>
        {user ? user.bio : ""}
      </ProfileElement>
      <ProfileElement title={""} className={st.btn}>
        {user === null && <AuthByTrello />}
        {user !== null && <Logout />}
      </ProfileElement>
      <ProfileError error={error} />
    </ProfileContainer>
  );
};

export default TrelloProfile;
