import React from "react";
import loader from "../../images/icons8-loading-40.png";
import styles from "./Loader.module.css";

type TLoaderProps = {
  isIcon?: boolean;
};

export default function Loader({ isIcon }: TLoaderProps): React.JSX.Element {
  return (
    <div className={`${styles.loader} ${isIcon && styles.icon}`}>
      <img src={loader} alt="Загрузка.." />
    </div>
  );
}
