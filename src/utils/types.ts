import { SyntheticEvent } from "react";

export enum SocketStateEnum {
  CONNECTING = "CONNECTING",
  ONLINE = "ONLINE",
  CLOSING = "CLOSING",
  CLOSED = "CLOSED",
  OFFLINE = "OFFLINE",
}

export enum IngredientTypeEnum {
  BUN = "bun",
  SAUCE = "sauce",
  MAIN = "main",
}

export enum StatusOrderEnum {
  created = "создан",
  pending = "готовится",
  done = "выполнен",
  canceled = "отменен",
}
export type TStatusOrder = Partial<keyof StatusOrderEnum>;

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

export type TCard = {
  orderId: string;
  name: string;
  price: number;
  date: string;
  ingredients: Array<TIngredient["_id"]>;
  status?: TStatusOrder;
};

export type TOrder = {
  createdAt: string; // "2025-03-18T20:57:48.900Z"
  updatedAt: string;
  ingredients: Array<TIngredientFullInfo["_id"]>;
  name: string;
  number: number; // номер заказа, приходящий от сервера
  status: TStatusOrder;
  _id: string;
};

export type DragCollectedProps = {
  isDragging: boolean;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
};

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TResponseWithSuccess = {
  success?: boolean;
};

export type TResponse = TResponseWithSuccess & {
  user: Omit<TUser, "password">;
};

export type TResponseWithTokens = TResponse & TTokens;

export type TResponseOrdersWithStore = {
  data: TResponseWithSuccess & {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  rootState: unknown;
};
