import React from "react";
import st from "./Footer.module.scss";
import { FooterLink, routerPaths } from "@/shared";
const Footer = () => {
  return (
    <footer className={st.footer}>
      <div className={st.footer__body}>
        <ul className={st.footer__links}>
          <li>
            <FooterLink name="Trello" to={routerPaths.trello} />{" "}
          </li>
          <li>
            <FooterLink name="Google" to={routerPaths.google} />{" "}
          </li>
          <li>
            <FooterLink name="Настройки" to={routerPaths.profile} />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
