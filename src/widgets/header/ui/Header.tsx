import React from "react";
import { Link } from "react-router-dom";

import st from "./Header.module.scss";

import { Logo } from "@/shared/assets";
import { routerPaths } from "@/shared/constants";
import { HeaderLink } from "@/shared/ui";
import { links } from "../contants/data";

const Header = () => {
  return (
    <header className={st.header}>
      <div className={st.header__body}>
        <Link to={routerPaths.main}>
          <Logo />
        </Link>
        <nav>
          <ul className={st.header__links}>
            {links.map((link) => (
              <li key={link.name}>
                <HeaderLink to={link.to} name={link.name} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
