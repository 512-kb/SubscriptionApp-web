import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Image, Segment } from "semantic-ui-react";

class Head extends React.Component {
  state = {};
  logout = () => sessionStorage.clear();
  render() {
    return (
      <Segment clearing>
        <Header as="h2" floated="left">
          <Image
            circular
            src="https://react.semantic-ui.com/images/avatar/large/patrick.png"
          />
          {this.props.name}
        </Header>
        <Link to="/">
          <Button floated="right" color="black" onClick={this.logout}>
            Logout
          </Button>
        </Link>
        <Header as="h2" floated="right">
          CREDITS:{this.props.credits}
        </Header>
      </Segment>
    );
  }
}

export default Head;
