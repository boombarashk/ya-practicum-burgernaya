import { STORAGE_TOKEN, STORAGE_TOKEN_REFRESH, PREFIX_TOKEN } from "../consts";
import { TTokens } from "./types";

export default function setTokens({
  accessToken,
  refreshToken,
}: TTokens): void {
  localStorage.setItem(STORAGE_TOKEN, accessToken.split(PREFIX_TOKEN)[1]);
  localStorage.setItem(STORAGE_TOKEN_REFRESH, refreshToken);
}
