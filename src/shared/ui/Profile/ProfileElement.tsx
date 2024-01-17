import React, { FC } from "react";
import st from "./Profile.module.scss";
interface Props {
  title: string;
  children: React.ReactNode;
  isVisible?: boolean;
  className?: string;
}
const ProfileElement: FC<Props> = ({
  className = "",
  isVisible = true,
  title,
  children,
}) => {
  return (
    <div
      className={`${className} ${st.profile__element} ${
        isVisible ? "" : st.profile__element_notVisible
      }`}
    >
      <div className={st.profile__head}>{title}</div>
      <div className={st.profile__description}>{children}</div>
    </div>
  );
};

export default ProfileElement;
