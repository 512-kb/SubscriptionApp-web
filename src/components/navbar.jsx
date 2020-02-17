import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  constructor(props) {
    super(props);

    this.state = { id: this.props.user.id, name: this.props.user.name };
  }

  render() {
    console.log(this.state);
    return (
      <Button.Group size="large" color="blue">
        <Link to="/user/subscription">
          <Button>Subscription</Button>
        </Link>
        <Link to="/user/changePlan">
          <Button>Change Plan</Button>
        </Link>
        <Link to="/user/addCard">
          <Button>Add Card</Button>
        </Link>
      </Button.Group>
    );
  }
}

export default Navbar;
