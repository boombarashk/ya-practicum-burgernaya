import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { ProfileSelector } from "../../store";
import Loader from "../Loader/Loader";
import { STORAGE_TOKEN } from "../../consts";

type TProtectedRouteProps = {
  component: React.JSX.Element;
  forUnauthtorized?: boolean;
};

export default function ProtectedRoute({
  component,
  forUnauthtorized = false,
}: TProtectedRouteProps): React.JSX.Element {
  const { user, loading } = useSelector(ProfileSelector);

  const isAuthtorized =
    typeof user?.name !== "undefined" || !!localStorage.getItem(STORAGE_TOKEN);

  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
  if (isAuthtorized && forUnauthtorized) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!isAuthtorized && !forUnauthtorized) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  /*
    if (isAuthtorized && !forUnauthtorized ||
        !isAuthtorized && forUnauthtorized
    )*/
  return <>{component}</>;
}
