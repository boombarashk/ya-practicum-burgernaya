import React from "react";
import { NavLink } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

export default function AppHeader(): React.JSX.Element {
  const addActiveClassName = ({ isActive }: { isActive: boolean }): string =>
    isActive ? styles.active : "inactive text_color_inactive";

  return (
    <header>
      <div className={styles.header_container}>
        <nav className={styles.nav}>
          <ul>
            <li key={"base-page"}>
              <NavLink to="/" className={addActiveClassName}>
                <BurgerIcon type="primary" />
                Конструктор
              </NavLink>
            </li>
            <li key={"ribbon-page"}>
              <NavLink to="/order" className={addActiveClassName}>
                <ListIcon type="secondary" />
                Лента заказов
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.header_logo}>
          <Logo />
        </div>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${styles.header_auth_link} ${addActiveClassName({ isActive })}`
          }>
          <ProfileIcon type="primary" />
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
}
