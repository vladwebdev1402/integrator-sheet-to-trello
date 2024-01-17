import React, { FC } from "react";
import st from "./Profile.module.scss";

interface Props {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const ProfileContainer: FC<Props> = ({ title, children, className = "" }) => {
  return (
    <div className={`${className} ${st.profile}`}>
      <div className={st.profile__title}>{title}</div>
      <div className={st.profile__body}>{children}</div>
    </div>
  );
};

export default ProfileContainer;
