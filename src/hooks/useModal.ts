import { useState, useEffect } from "react";
import { TIngredientFullInfo } from "../utils/types";

const useModal = ({
  checkState,
  redirectUrl,
}: {
  checkState: TIngredientFullInfo | string | null | undefined;
  redirectUrl: string;
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal && checkState) {
      // browser location and history
      history.pushState(null, "", redirectUrl);
    }
  }, [showModal, checkState]);

  return {
    showModal,
    setShowModal,
  };
};
export default useModal;
