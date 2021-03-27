import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <h1>Login</h1>} />
        <Route path="/signup" component={() => <h1>SignUp</h1>} />
        <PrivateRoute path="/app" component={() => <h1>App</h1>} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;