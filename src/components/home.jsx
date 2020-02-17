import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class Home extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <Link to="/login">
          <Button color="blue">Login</Button>
        </Link>
        <Link to="/register">
          <Button color="green">Sign Up</Button>
        </Link>
      </div>
    );
  }
}

export default Home;
