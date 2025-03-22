import { useEffect } from "react";
import { wsConnect, wsDisconnect } from "../services/wsActions";
import { useAppDispatch } from "../store";

export const useSocket = (url: string) => {
  const dispatch = useAppDispatch();
  const connect = () => dispatch(wsConnect(url));
  const disconnect = () => dispatch(wsDisconnect());

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  return { connect };
};
