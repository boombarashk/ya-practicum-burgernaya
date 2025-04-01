import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from "@reduxjs/toolkit";
import { wsConnect } from "./wsActions";
import { refreshToken } from "../utils/api";
import setTokens from "../utils/setTokens";

export type TWsActionTypes<R, S> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<{ data: R; rootState: unknown }>;
  sendMessage?: ActionCreatorWithPayload<S>;
};

const RECONNECT_PERIOD = 3000;

export const wsMiddleware =
  <R, S>(
    wsActions: TWsActionTypes<R, S>,
  ): Middleware<Record<string, never>, unknown /*RootState*/> =>
  (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      onConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
      sendMessage,
    } = wsActions;
    let isConnected = false;
    let reconnectTimer = 0;
    let wssUrl = "";

    return (next) => (action) => {
      const { dispatch } = store;

      if (connect.match(action)) {
        wssUrl = action.payload;
        const withTokenRefresh = wssUrl.indexOf("?token") > 0;

        socket = new WebSocket(wssUrl);
        onConnecting && dispatch(onConnecting());
        isConnected = true;

        socket.onopen = () => {
          onOpen && dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("Error"));
        };

        socket.onmessage = (event) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);

            if (
              withTokenRefresh &&
              parsedData.message === "Invalid or missing token"
            ) {
              refreshToken()
                .then((refreshData) => {
                  setTokens({ ...refreshData });
                  const url = new URL(wssUrl);
                  url.searchParams.set(
                    "token",
                    refreshData.accessToken.replace("Bearer ", ""),
                  );
                  dispatch(connect(url.toString()));
                })
                .catch((err: Error) => {
                  dispatch(onError(err.message));
                });
            }

            dispatch(
              onMessage({ data: parsedData, rootState: store.getState() }),
            );
          } catch (err) {
            dispatch(onError((err as Error).message));
          }
        };

        socket.onclose = () => {
          onClose && dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(wssUrl));
            }, RECONNECT_PERIOD);
          }
        };
      }

      if (socket && sendMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (err) {
          dispatch(onError((err as Error).message));
        }
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
