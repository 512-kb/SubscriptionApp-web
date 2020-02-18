import React from "react";
import { Form, Button } from "semantic-ui-react";
import history from "../history";
import axios from "axios";
import URL from "../url";

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    isNameCorrect: true,
    isEmailCorrect: true,
    isPassCorrect: true,
    isMobileCorrect: true,
    requestSent: false
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  emailValidator = email => {
    // eslint-disable-next-line
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (email === "" || !pattern.test(email)) return false;
    return true;
  };

  nameValidator = name => {
    if (name === "" || name.length < 1) return false;
    return true;
  };

  passValidator = pass => {
    if (pass === "" || !/[a-zA-Z0-9._@]{8,}/.test(pass)) return false;
    return true;
  };

  mobileValidator = mobile => {
    if (mobile === "" || mobile.length !== 10) return false;
    return true;
  };

  validate = () => {
    var flag = true;
    if (!this.nameValidator(this.state.name)) {
      this.setState({ isNameCorrect: false });
      flag = false;
    } else if (!this.state.isNameCorrect)
      this.setState({ isNameCorrect: true });

    if (!this.emailValidator(this.state.email)) {
      this.setState({ isEmailCorrect: false });
      flag = false;
    } else if (!this.state.isEmailCorrect)
      this.setState({ isEmailCorrect: true });

    if (!this.passValidator(this.state.pass)) {
      this.setState({ isPassCorrect: false });
      flag = false;
    } else if (!this.state.isPassCorrect)
      this.setState({ isPassCorrect: true });

    if (!this.mobileValidator(this.state.mobile)) {
      this.setState({ isMobileCorrect: false });
      flag = false;
    } else if (!this.state.isGenderCorrect)
      this.setState({ isMobileCorrect: true });

    if (flag) this.register();
  };

  register = async () => {
    const user = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.mobile
    };
    this.setState({ requestSent: true });
    await axios
      .post(URL + "/register", { user, password: this.state.pass })
      .then(res => {
        this.setState({ requestSent: false });
        sessionStorage.setItem("user", JSON.stringify(res.data._id));
        res.data.existingPlan = "none";
        res.data.plan = "";
        res.data.requestSent = false;
        history.push("/user", res.data);
      });
  };

  render() {
    const { name, email, pass, mobile } = this.state;
    return (
      <Form>
        <Form.Group>
          {this.state.isNameCorrect ? (
            <Form.Input
              label="Name"
              placeholder="Name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          ) : (
            <Form.Input
              label="Name"
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
              error={{
                content: "Please enter name",
                pointing: "below"
              }}
              value={name}
            />
          )}
        </Form.Group>
        <Form.Group>
          {this.state.isEmailCorrect ? (
            <Form.Input
              label="Email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          ) : (
            <Form.Input
              label="Email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
              error={{
                content: "Please enter a valid email address",
                pointing: "below"
              }}
            />
          )}
        </Form.Group>
        <Form.Group>
          {this.state.isPassCorrect ? (
            <Form.Input
              label="Password"
              placeholder="Password"
              name="pass"
              value={pass}
              onChange={this.handleChange}
            />
          ) : (
            <Form.Input
              label="Password"
              placeholder="Password"
              name="password"
              value={pass}
              onChange={this.handleChange}
              error={{
                content:
                  "Invalid Password Format ( only '.' , '@' , '_' , a-z , A-z , 0-9 are allowed. Min Length = 8 )",
                pointing: "below"
              }}
            />
          )}
        </Form.Group>
        <Form.Group>
          {this.state.isMobileCorrect ? (
            <Form.Input
              label="Mobile"
              placeholder="Mobile"
              name="mobile"
              value={mobile}
              onChange={this.handleChange}
            />
          ) : (
            <Form.Input
              label="Mobile"
              placeholder="Mobile"
              type="number"
              name="mobile"
              value={mobile}
              onChange={this.handleChange}
              error={{
                content: "Mobile number should be of 10 digits",
                pointing: "below"
              }}
            />
          )}
        </Form.Group>
        {this.state.requestSent ? (
          <Button loading primary>
            Loading
          </Button>
        ) : (
          <Button color="green" onClick={() => this.validate()}>
            Register
          </Button>
        )}
      </Form>
    );
  }
}

export default Register;
