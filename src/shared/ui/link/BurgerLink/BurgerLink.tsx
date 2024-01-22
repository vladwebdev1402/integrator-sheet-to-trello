import React, { FC } from "react";
import { Link, useMatch } from "react-router-dom";
import st from "./BurgerLink.module.scss";

import { ILinkProps } from "@/shared/types";

const BurgerLink: FC<ILinkProps> = ({ name, to, className = "" }) => {
  const match = useMatch(to);

  return (
    <Link to={to} className={`${match ? st.link_active : ""} ${st.link}`}>
      {name}
    </Link>
  );
};

export default BurgerLink;
