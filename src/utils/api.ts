import {
  REFRESH_TOKEN_URL,
  STORAGE_TOKEN_REFRESH,
  STORAGE_TOKEN,
  PREFIX_TOKEN,
} from "../consts";
import setTokens from "./setTokens";

export const fetchRequestJSON = <T>(
  url: string,
  opts: Partial<RequestInit> = {},
): Promise<T> =>
  fetch(url, opts)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Oops ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.success) return data?.data ?? data;
    });

const checkReponse = <T>(res: Response): Promise<T> => {
  return res.ok ?
      res.json()
    : res.json().then((err: Error) => Promise.reject(err));
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: Partial<RequestInit> = {},
): Promise<T> => {
  const accessToken = localStorage.getItem(STORAGE_TOKEN);
  options.headers = {
    "Content-Type": "application/json;charset=utf-8",
    authorization: `${PREFIX_TOKEN}${accessToken}`,
  };

  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if ((err as Error).message === "jwt expired") {
      // обновление токена
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      // повторный запрос
      const res = await fetch(url, options);
      setTokens({ ...refreshData });
      /*fixme delete
      localStorage.setItem(REFRESH_TOKEN_URL, refreshData.refreshToken); 
      localStorage.setItem(STORAGE_TOKEN, refreshData.accessToken);*/
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const refreshToken = async () =>
  fetchRequestJSON<{
    success: boolean;
    accessToken: string;
    refreshToken: string;
  }>(REFRESH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem(STORAGE_TOKEN_REFRESH),
    }),
  });
