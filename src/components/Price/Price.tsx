import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatNumber } from "../../utils/format";
import styles from "./Price.module.css";

type TPriceProps = {
  value: number;
  customClassName?: string;
  size?: number;
  count?: number;
};

export default function Price({
  value,
  customClassName = "",
  size,
  count = 1,
}: TPriceProps): React.JSX.Element {
  return (
    <div className={`${customClassName} ${styles.container}`}>
      <p className="text" style={{ fontSize: size ?? 28 }}>
        {count > 1 && `${count} x `}
        {formatNumber(value)}
      </p>
      <CurrencyIcon type="primary" />
    </div>
  );
}
