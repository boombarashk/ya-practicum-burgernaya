import { STORAGE_TOKEN, STORAGE_TOKEN_REFRESH, PREFIX_TOKEN } from "../consts";

export default function setTokens({ accessToken, refreshToken }) {
  localStorage.setItem(STORAGE_TOKEN, accessToken.split(PREFIX_TOKEN)[1]);
  localStorage.setItem(STORAGE_TOKEN_REFRESH, refreshToken);
}
