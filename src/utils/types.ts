import { SyntheticEvent } from "react";

export enum IngredientTypeEnum {
  BUN = "bun",
  SAUCE = "sauce",
  MAIN = "main",
}

export enum InputTypeEnum {
  TEXT = "text",
  EMAIL = "email",
  PWD = "password",
}

export enum ButtonTypeEnum {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset",
}

enum IconEnum {
  HIDEICON = "HideIcon",
  SHOWICON = "ShowIcon",
  EDITICON = "EditIcon",
}

export type TButtonProps = {
  text: string;
  handleClick?: (ev: SyntheticEvent) => void;
  htmlType?: ButtonTypeEnum;
  isSecondary?: boolean;
};

export type TFieldProps = {
  inputType: InputTypeEnum;
  inputName: string;
  placeholder: string;
  value?: unknown;
  disabled?: boolean;
  icon?: IconEnum;
};

export type TValues<T extends string | symbol | number, V> = {
  [key in T]: V;
};

export type TIngredientDetails = {
  name: string;
  image_large: string;
  fat: number;
  calories: number;
  carbohydrates: number;
  proteins: number;
};

export type TIngredientFullInfo = TIngredientDetails & {
  _id: string;
  id?: string;
  type?: IngredientTypeEnum;
  price: number;
  image: string;
  image_mobile?: string;
};

export type TIngredient = {
  _id: string;
  id?: string;
  label: string;
  price: number;
  image: string;
};

export type DragCollectedProps = {
  isDragging: boolean;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
};
