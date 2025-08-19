import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Debugging: log current route and authentication status
  //   console.log(location.pathname, isAuthenticated);

  /**
   * 1. Handle root path "/"
   *    - If NOT authenticated → redirect to login
   *    - If authenticated:
   *        - Admin → go to /admin/dashboard
   *        - Normal user → go to /shop/home
   */
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" replace />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
      } else {
        return <Navigate to="/shop/home" replace />;
      }
    }
  }

  /**
   * 2. Block unauthenticated users from accessing protected pages
   *    - Only allow access to /login and /register
   *    - Any other route redirects to /auth/login
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
   * 3. Prevent authenticated users from going back to login/register
   *    - Admin → redirect to /admin/dashboard
   *    - Normal user → redirect to /shop/home
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
   * 4. Restrict non-admin users from accessing admin routes
   *    - Example: normal user tries /admin/dashboard → redirect to /unauth-page
   */
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  /**
   * 5. Restrict admins from accessing shop routes
   *    - Example: admin tries /shop/home → redirect back to /admin/dashboard
   */
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  /**
   * 6. Default case:
   *    - If none of the above conditions matched,
   *      render the requested route/page (children)
   */
  return <>{children}</>;
}

export default CheckAuth;
