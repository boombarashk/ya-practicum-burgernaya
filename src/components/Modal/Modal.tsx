import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

const modalContentEl: HTMLElement =
  document.getElementById("modal-content") || document.body;

type TModalProps = {
  children?: React.ReactNode;
  visible?: boolean;
  onHandleClose?: () => void;
  title?: string;
};

export default function Modal({
  children,
  title = "",
  onHandleClose = () => {},
}: TModalProps): React.JSX.Element {
  useEffect(() => {
    const onHandleEscape = (ev: KeyboardEvent) => {
      if (ev.code == "Escape") {
        onHandleClose();
      }
    };

    document.addEventListener("keydown", onHandleEscape);
    return () => {
      document.removeEventListener("keydown", onHandleEscape);
    };
  });

  return createPortal(
    <ModalOverlay onHandleClick={onHandleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.close}>
          <CloseIcon type="primary" onClick={onHandleClose} />
        </div>

        <h2 className={styles.title}>{title}</h2>

        <div className={styles.inner}>{children}</div>
      </div>
    </ModalOverlay>,
    modalContentEl,
  );
}
