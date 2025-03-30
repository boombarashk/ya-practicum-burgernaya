import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient, DragCollectedProps } from "../../../../utils/types";
import {
  sortIngredients,
  deleteIngredient,
} from "../../../../services/reducers/burgerConstructor";
import styles from "../../BurgerConstructor.module.css";

type TDraggingConstructorElementProps = {
  ingredient: TIngredient;
  index: number;
};

type DragDropObject = { id: TIngredient["_id"]; index: number };

export default function DraggingConstructorElement({
  ingredient,
  index,
}: TDraggingConstructorElementProps): React.JSX.Element {
  const ingredientRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  /* https://react-dnd.github.io/react-dnd/examples/sortable/simple */
  const [{ isDragging }, drag] = useDrag<
    DragDropObject,
    unknown,
    DragCollectedProps
  >({
    type: "filling",
    item: () => {
      return { id: ingredient._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<DragDropObject, unknown, unknown>({
    accept: "filling",
    hover: (item, monitor) => {
      if (!ingredientRef.current) return;

      const dragIndex: number = item.index;
      const hoverIndex: number = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ingredientRef.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() as XYCoord;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // dragging down
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      // dragging up
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(sortIngredients({ dragIndex, hoverIndex }));

      item.index = hoverIndex;
    },
  });

  drag(drop(ingredientRef));

  const opacity = isDragging ? 0 : 1;

  return (
    <section
      ref={ingredientRef}
      className={styles.section}
      style={{ opacity }}
      data-testid={`draggable-${index}`}>
      <span className={styles.icon}>
        <DragIcon type="primary" />
      </span>

      <ConstructorElement
        text={ingredient.label}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          dispatch(
            deleteIngredient({
              id: ingredient.id,
              price: ingredient.price,
              key_id: ingredient._id,
            }),
          );
        }}
      />
    </section>
  );
}
