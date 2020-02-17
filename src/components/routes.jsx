import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import User from "./user";

class Routes extends React.Component {
  render = () => {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user" component={User} />
      </Switch>
    );
  };
}

export default Routes;
