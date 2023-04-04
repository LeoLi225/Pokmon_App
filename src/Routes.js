import React from "react";
import { Route, Redirect } from "react-router-dom";

const RoleRoute = ({ component: Component, role, ...rest }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("role");

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && userRole === role ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default RoleRoute;
