import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  /**
   * 1. If user is NOT authenticated and trying to access any page
   *    other than /login or /register → Redirect to /auth/login
   */
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  /**
   * 2. If user IS authenticated and tries to access login/register,
   *    redirect based on their role:
   *      - Admin → /admin/dashboard
   *      - Normal user → /shop/home
   */
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/shop/home" replace />;
    }
  }

  /**
   * 3. If user IS authenticated but NOT an admin,
   *    and tries to access an admin page → Redirect to /unauth-page
   */
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  /**
   * 4. If user IS authenticated and IS an admin,
   *    but tries to access shop pages → Redirect to /admin/dashboard
   */
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  /**
   * 5. Default case → Render the requested page (children)
   */
  return <>{children}</>;
};

export default CheckAuth;
