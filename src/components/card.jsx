import React from "react";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import URL from "../url";
class CardSection extends React.Component {
  state = {
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    requestSent: false
  };
  constructor(props) {
    super(props);
    this.state.name = this.props.name;
    this.state.email = this.props.email;
    this.state._id = this.props._id;
    this.state.plan = this.props.plan;
  }

  validate = async () => {
    this.setState({ requestSent: true });
    await axios.post(URL + "/user/subscribe", this.state).then(res => {
      this.setState({ requestSent: false });
      if (res.data.err) alert(res.data.err);
      else {
        alert(res.data.existingPlan.name + " active now");
        this.props.activatePlan(res.data);
      }
    });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Input
            label="Card No."
            placeholder="Card No."
            name="number"
            width="8"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Exp Month"
            placeholder="Exp Month"
            name="exp_month"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Exp Year"
            placeholder="Exp Year"
            name="exp_year"
            onChange={this.handleChange}
          />
          <Form.Input
            label="CVC"
            placeholder="CVC"
            name="cvc"
            onChange={this.handleChange}
          />
        </Form.Group>
        {this.state.requestSent ? (
          <Button loading primary>
            Loading
          </Button>
        ) : (
          <Button color="blue" onClick={this.validate}>
            PAY
          </Button>
        )}
      </Form>
    );
  }
}

export default CardSection;
