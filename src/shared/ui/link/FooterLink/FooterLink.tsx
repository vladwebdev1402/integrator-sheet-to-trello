import React, { FC } from "react";
import { Link } from "react-router-dom";

import st from "./FooterLink.module.scss";

import { ILinkProps } from "@/shared/types/ILinkProps";

const FooterLink: FC<ILinkProps> = ({ to, name, className = "" }) => {
  return (
    <Link to={to} className={`${st.link} ${className}`}>
      {name}
    </Link>
  );
};

export default FooterLink;
