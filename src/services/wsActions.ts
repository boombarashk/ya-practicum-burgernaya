import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "CONNECT">("CONNECT");
export const wsDisconnect = createAction("DISCONNECT");

export type TWsExternalActions =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsDisconnect>;
