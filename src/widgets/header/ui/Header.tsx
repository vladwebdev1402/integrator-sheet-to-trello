import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import st from "./Header.module.scss";

import { Logo } from "@/shared/assets";
import { routerPaths } from "@/shared/constants";
import { BurgerLink, HeaderLink } from "@/shared/ui";
import { links } from "../contants/data";
import ButtonBurger from "@/shared/ui/buttons/ButtonBurger/ButtonBurger";

const Header = () => {
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  const burgerClick = () => {
    setIsOpenBurger(!isOpenBurger);
  };

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    if (isOpenBurger) {
      body.classList.add("stop-scroll");
    } else body.classList.remove("stop-scroll");
  }, [isOpenBurger]);

  return (
    <>
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
          <ButtonBurger
            active={isOpenBurger}
            onClick={burgerClick}
            className={st.header__button}
          />
        </div>
      </header>
      <nav
        className={`${isOpenBurger ? st.header__burger_open : ""} ${
          st.header__burger
        }`}
      >
        <ul className={st.header__burgerLinks}>
          {links.map((link) => (
            <li key={link.name} onClick={burgerClick}>
              <BurgerLink to={link.to} name={link.name} />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Header;
