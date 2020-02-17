import React, { Fragment } from "react";
import User from "./user";
import Routes from "./routes";

export default class App extends React.Component {
  state = {};
  updateUser = id => {
    console.log(id);
  };
  render = () => {
    return this.state.userID ? (
      <User />
    ) : (
      <Fragment>
        <Routes />
      </Fragment>
    );
  };
}
