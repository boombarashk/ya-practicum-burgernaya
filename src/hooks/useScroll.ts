import React, { useState } from "react";
import { TYPE_INGREDIENT, TAB_SELECTOR } from "../consts";
import { IngredientTypeEnum } from "../utils/types";

type THTMLElementEvent<T extends HTMLElement> = React.SyntheticEvent & {
  target: T;
};

const isHTMLElementWithDataset = (el: HTMLElement | null): el is HTMLElement =>
  el !== null && typeof el !== "undefined" && "dataset" in el;

const useScroll = () => {
  const [visibleHeader, setVisibleHeader] = useState<IngredientTypeEnum | null>(
    null,
  );

  let closestHeader: HTMLElement | null = null;

  const onHandleScroll = (ev: React.SyntheticEvent) => {
    const scrollContainer = (ev as THTMLElementEvent<HTMLElement>).target;

    const headers = scrollContainer.querySelectorAll(TAB_SELECTOR);
    closestHeader = null;
    let closestDistance = Infinity;

    (Array.from(headers) as HTMLElement[]).forEach((header) => {
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

    if (isHTMLElementWithDataset(closestHeader))
      setVisibleHeader(closestHeader.dataset.ref);
  };

  return {
    onHandleScroll,
    currentTab: visibleHeader ?? TYPE_INGREDIENT[0].param,
  };
};
export default useScroll;
