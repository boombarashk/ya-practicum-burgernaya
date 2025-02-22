import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";

export default function Layout(): React.JSX.Element {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}
