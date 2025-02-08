import { useState } from "react";
import { TYPE_INGREDIENT, TAB_SELECTOR } from "../consts";

const useScroll = () => {
  const [visibleHeader, setVisibleHeader] = useState(null);

  const onHandleScroll = (e) => {
    const scrollContainer = e.target;

    const headers = Array.from(scrollContainer.querySelectorAll(TAB_SELECTOR));

    let closestHeader = null;
    let closestDistance = Infinity;

    headers.forEach((header) => {
      const headerRect = header.getBoundingClientRect();
      const scrollContainerRect = scrollContainer.getBoundingClientRect();

      // Проверяем, находится ли заголовок в пределах видимости
      if (
        headerRect.top >= scrollContainerRect.top &&
        headerRect.bottom <= scrollContainerRect.bottom
      ) {
        const distanceToTop = Math.abs(
          headerRect.top - scrollContainerRect.top,
        );
        if (distanceToTop < closestDistance) {
          closestDistance = distanceToTop;
          closestHeader = header;
        }
      }
    });

    if (closestHeader) setVisibleHeader(closestHeader.dataset.ref);
  };

  return {
    onHandleScroll,
    currentTab: visibleHeader ?? TYPE_INGREDIENT[0].param,
  };
};
export default useScroll;
