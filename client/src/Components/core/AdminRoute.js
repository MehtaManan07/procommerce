import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) =>{
    const auth = useSelector(state => state.auth)
    return (
  <Route
    {...rest}
    render={(props) =>
     auth && auth.user.role === 'admin' ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/", state: { from: props.location } }}
        />
      )
    }
  />
)};
export default AdminRoute;
