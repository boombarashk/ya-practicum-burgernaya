import React from "react";
import styles from "./ModalOverlay.module.css";

type TModalOverlayProps = {
  children: React.ReactElement;
  onHandleClick: () => void;
};

export default function ModalOverlay({
  children,
  onHandleClick,
}: TModalOverlayProps): React.JSX.Element {
  return (
    <div className={styles.overlay} id="modal-overlay" onClick={onHandleClick}>
      {children}
    </div>
  );
}
