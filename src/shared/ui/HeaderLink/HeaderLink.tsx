import React, { FC } from "react";
import { Link, useMatch } from "react-router-dom";

import st from "./HeaderLink.module.scss";
import { ILinkProps } from "@/shared/types/ILinkProps";

const HeaderLink: FC<ILinkProps> = ({ to, name, className = "" }) => {
  const match = useMatch(to);

  return (
    <Link
      className={`${st.link} ${match ? st.link_active : ""} ${className}`}
      to={to}
    >
      {name}
    </Link>
  );
};

export default HeaderLink;
