import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound404.module.css";

export default function NotFound404Page(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={`text text_type_main-large ${styles.header}`}>404</h1>
      <p className="text text_type_main-default">
        Страница не найдена. Вернитесь{" "}
        <a
          className={styles.link}
          onClick={() => {
            navigate(-1);
          }}>
          назад
        </a>
      </p>
      <div className={styles.bg_atom}></div>
    </div>
  );
}
