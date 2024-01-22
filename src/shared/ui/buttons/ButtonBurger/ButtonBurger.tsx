import React, { FC } from "react";
import st from "./ButtonBurger.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

const ButtonBurger: FC<Props> = ({
  active,
  className = "",
  onClick = () => {},
}) => {
  return (
    <button
      className={`${className} ${st.burger} ${active ? st.burger_active : ""}`}
      onClick={onClick}
    >
      <div className={`${st.line} ${st.line1}`}></div>
      <div className={`${st.line} ${st.line2}`}></div>
      <div className={`${st.line} ${st.line3}`}></div>
    </button>
  );
};

export default ButtonBurger;
