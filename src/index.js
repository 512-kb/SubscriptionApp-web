import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./components/App";
import history from "./history";

class Index extends React.Component {
  state = {};

  render() {
    return (
      <div style={{ padding: "2%" }}>
          <Router history={history}>
            <App />
          </Router>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));
