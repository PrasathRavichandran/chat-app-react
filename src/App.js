import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./hoc/protected.route";

import { Home, Login, NotFound, Signup } from "./screens";

const App = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          path="/home"
          component={Home}
          isAuthenticated={auth.isAuthenticated}
          isVerifying={auth.isVerifying}
        />

        <Route path="/login" component={Login} />

        <Route path="/signup" component={Signup} />

        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
