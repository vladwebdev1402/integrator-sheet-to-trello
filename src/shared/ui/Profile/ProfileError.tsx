import React, { FC } from "react";
import st from "./Profile.module.scss";
interface Props {
  error: string;
  className?: string;
}

const ProfileError: FC<Props> = ({ error, className = "" }) => {
  return <div className={`${className} ${st.profile__error}`}>{error}</div>;
};

export default ProfileError;
