import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { fetchLogout, resetProfile } from "../../services/reducers/profile";
import { STORAGE_TOKEN_REFRESH } from "../../consts";
import navStyles from "./NavProfile.module.css";
import { useAppDispatch } from "../../store";

export default function NavProfile(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem(STORAGE_TOKEN_REFRESH);
    if (token) {
      dispatch(resetProfile());
      dispatch(fetchLogout({ token }));
      navigate("/");
    }
  };

  return (
    <>
      <ul className={navStyles.container}>
        <li className={navStyles.link}>
          <NavLink
            end
            to="/profile"
            className={({ isActive }) =>
              isActive ? navStyles.link_active : ""
            }>
            <span className="text text_color_inactive">Профиль</span>
          </NavLink>
        </li>
        <li className={navStyles.link}>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              isActive ? navStyles.link_active : ""
            }>
            <span className="text text_color_inactive">История заказов</span>
          </NavLink>
        </li>
        <li className={navStyles.link}>
          <Link to="/" onClick={handleLogout}>
            <span className="text text_color_inactive">Выход</span>
          </Link>
        </li>
      </ul>
      <p className="text text_type_main-small text_color_inactive">
        В этом разделе вы можете
        <br /> изменить свои персональные данные
      </p>
    </>
  );
}
