import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import ResetPwdPage from "./pages/ResetPwd/ResetPwd";
import RestorePwdPage from "./pages/RestorePwd/RestorePwd";
import UserProfilePage from "./pages/UserProfile/UserProfile";
import IngredientPage from "./pages/Ingredient/Ingredient";
import NotFound404Page from "./pages/NotFound404/NotFound404";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./base.css";

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
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

          <Route path="/ingredients/:id" element={<IngredientPage />} />
        </Route>
        <Route path="*" element={<NotFound404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
