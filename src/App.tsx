import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import ResetPwdPage from "./pages/ResetPwd/ResetPwd";
import RestorePwdPage from "./pages/RestorePwd/RestorePwd";
import UserProfilePage from "./pages/UserProfile/UserProfile";
import IngredientPage from "./pages/Ingredient/Ingredient";
import OrderPage from "./pages/Order/Order";
import FeedPage from "./pages/Feed/Feed";
import UserOrdersPage from "./pages/UserOrders/UserOrders";
import NotFound404Page from "./pages/NotFound404/NotFound404";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAppDispatch, ingredientsSelector } from "./store";
import { fetchIngredients } from "./services/reducers/ingredients";
import "./base.css";

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { data: ingredientsData } = useSelector(ingredientsSelector);

  useEffect(() => {
    if (ingredientsData.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [ingredientsData]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute forUnauthtorized component={<LoginPage />} />
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute forUnauthtorized component={<RegisterPage />} />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute forUnauthtorized component={<RestorePwdPage />} />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute forUnauthtorized component={<ResetPwdPage />} />
            }
          />
          <Route
            path="/profile"
            element={<ProtectedRoute component={<UserProfilePage />} />}
          />
          <Route
            path="/profile/orders"
            element={<ProtectedRoute component={<UserOrdersPage />} />}
          />
          <Route
            path="/profile/orders/:id"
            element={<ProtectedRoute component={<OrderPage />} />}
          />

          <Route path="/ingredients/:id" element={<IngredientPage />} />

          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<OrderPage />} />
        </Route>
        <Route path="*" element={<NotFound404Page />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
