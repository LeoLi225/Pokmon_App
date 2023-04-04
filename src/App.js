import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Userpage from "./UserPage";
import AdminDashboard from "./AdminDashboard";
import RoleRoute from "./Routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <RoleRoute exact path="/user" component={Userpage} role="user" />
        <RoleRoute exact path="/admin" component={AdminDashboard} role="admin" />
      </Switch>
    </Router>
  );
}

export default App;
