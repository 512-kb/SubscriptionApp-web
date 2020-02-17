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
    let data = { credits: 0 },
      flag = false;
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
    if (res.data.length > 0) {
      flag = true;
      data = res.data[0];
      data.existingPlan = "none";
    } else {
      alert("Incorrect Details");
    }

    if (flag) {
      if (data.id.length > 0) {
        await axios
          .get(URL + "/user/subscriptions/?id=" + data.id)
          .then(res => {
            let plan = res.data.plan;
            data.existingPlan = {
              id: plan.id,
              name: plan.nickname,
              sub_id: res.data.sub_id
            };
          });
      }
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
