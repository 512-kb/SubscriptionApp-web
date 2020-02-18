import React from "react";
import { Form, Button } from "semantic-ui-react";
import history from "../history";
import axios from "axios";
import URL from "../url";
class Login extends React.Component {
  state = {
    email: "",
    password: "",
    requestSent: false
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  validate = async () => {
    let data = new Object();
    this.setState({ requestSent: true });
    let res = await axios
      .get(
        URL +
          "/login?email=" +
          this.state.email +
          "&password=" +
          this.state.password
      )
      .catch(err => {
        console.warn(err);
      });

    this.setState({ requestSent: false });
    if (res.data === "NOT FOUND") alert("Incorrect Details");
    else {
      data = res.data;
      data.existingPlan = "none";
      data.plan = "";
      data.credits = 0;
      data.requestSent = false;
      sessionStorage.setItem("user", JSON.stringify(data._id));
      history.push("/user", data);
    }
  };

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Input
            label="Email"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.handleChange}
          />
        </Form.Group>
        {this.state.requestSent ? (
          <Button loading primary>
            Loading
          </Button>
        ) : (
          <Button color="blue" onClick={this.validate}>
            Login
          </Button>
        )}
      </Form>
    );
  }
}

export default Login;
