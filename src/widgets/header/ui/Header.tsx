import React from "react";
import { Link } from "react-router-dom";

import st from "./Header.module.scss";

import { HeaderLink, routerPaths } from "@/shared";
import { Logo } from "@/shared/assets";

const Header = () => {
  return (
    <header className={st.header}>
      <div className={st.header__body}>
        <Link to={routerPaths.main}>
          <Logo />
        </Link>
        <nav>
          <ul className={st.header__links}>
            <li>
              <HeaderLink to={routerPaths.main} name="home" />
            </li>
            <li>
              <HeaderLink to={routerPaths.trello} name="trello" />
            </li>
            <li>
              <HeaderLink to={routerPaths.google} name="google" />
            </li>
            <li>
              <HeaderLink to={routerPaths.profile} name="profile" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
