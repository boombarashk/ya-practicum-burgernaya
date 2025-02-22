import { IngredientTypeEnum } from "./utils/types";

export const BASE_URL = "https://norma.nomoreparties.space/api";

export const ORDER_URL = `${BASE_URL}/orders`;

export const DATA_URL = `${BASE_URL}/ingredients`;

export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const RESTORE_URL = `${BASE_URL}/password-reset`;
export const RESET_URL = `${BASE_URL}/password-reset/reset`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const USER_URL = `${BASE_URL}/auth/user`;
export const REFRESH_TOKEN_URL = `${BASE_URL}/auth/token`;

export const TYPE_INGREDIENT: Array<{
  title: string;
  param: IngredientTypeEnum;
}> = [
  { title: "Булки", param: IngredientTypeEnum.BUN },
  { title: "Соусы", param: IngredientTypeEnum.SAUCE },
  { title: "Начинки", param: IngredientTypeEnum.MAIN },
];

export const TAB_SELECTOR = "[data-ref]";

export const PREFIX_TOKEN = "Bearer ";

export const STORAGE_PWD_RESET = "resetPassword";
export const STORAGE_TOKEN = "accessToken";
export const STORAGE_TOKEN_REFRESH = "refreshToken";
