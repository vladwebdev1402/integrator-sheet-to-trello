import React from "react";
import st from "./Footer.module.scss";
import { FooterLink } from "@/shared/ui";
import { routerPaths } from "@/shared/constants";
import { useAppSelector } from "@/shared/hooks";
const Footer = () => {
  const { user: googleUser } = useAppSelector(
    (state) => state.AuthGoogleReducer
  );
  const { user: trelloUser } = useAppSelector(
    (state) => state.AuthTrelloReducer
  );

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
        <div className={st.footer__users}>
          {googleUser && (
            <div className={st.footer__user}>
              <div className={st.footer__account}>Google</div>
              <div className={st.footer__username}>{googleUser.username}</div>
            </div>
          )}

          {trelloUser && (
            <div className={st.footer__user}>
              <div className={st.footer__account}>Trello</div>
              <div className={st.footer__username}>{trelloUser.username}</div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
