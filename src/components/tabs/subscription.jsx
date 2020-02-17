import React from "react";
import { Button, Icon, Step } from "semantic-ui-react";
import axios from "axios";
import URL from "../../url";
class Subscription extends React.Component {
  state = { requestSent: false, planChangeRequestSent: false };

  constructor(props) {
    super(props);
    this.state = this.props.user;
  }

  changePlan = async () => {
    this.setState({ planChangeRequestSent: true });
    await axios
      .post(URL + "/user/PlanChange", {
        existingPlan: this.props.user.existingPlan,
        newPlan: false,
        _id: this.props.user._id
      })
      .then(res => {
        this.setState({ planChangeRequestSent: false });
        if (res.data === "no") alert("Plan change Failed");
        else {
          this.props.activatePlan(res.data);
          alert("Plan changed Successfuly");
        }
      });
  };

  consumeCredit = async () => {
    this.setState({ requestSent: true });
    const res = await axios
      .get(URL + "/user/consumeCredit?_id=" + this.state._id)
      .catch(err => {
        console.warn(err);
      });
    this.setState({ requestSent: false });
    if (res.data.message !== "Successfuly Consumed") {
      this.setState({ credits: res.data.credits });
    }
    this.props.setCredits(res.data.credits);
    alert(res.data.message);
  };
  render() {
    //console.log(this.state);
    return (
      <div>
        <Step.Group>
          <Step>
            <Icon name="paper plane" />
            <Step.Content>
              <Step.Title>{this.props.user.existingPlan.name}</Step.Title>
              <Step.Description>
                Currently Subscribed to {this.props.user.existingPlan.name}
              </Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
        {this.state.requestSent ? (
          <Button floated="right" disabled>
            <Button.Content>Please Wait</Button.Content>
          </Button>
        ) : (
          <Button color="blue" onClick={this.consumeCredit} floated="right">
            <Button.Content>Consume a Unit Credit</Button.Content>
          </Button>
        )}
        <br />
        {this.state.planChangeRequestSent ? (
          <Button loading>Changing</Button>
        ) : (
          <Button color="green" onClick={this.changePlan} animated="fade">
            <Button.Content visible>
              Change to
              {this.props.user.existingPlan.name === "Plan 1"
                ? " Plan 2"
                : " Plan 1"}
            </Button.Content>
            <Button.Content hidden>
              for
              {this.props.user.existingPlan.name === "Plan 1"
                ? " ₹19/month"
                : " ₹9/month"}
            </Button.Content>
          </Button>
        )}
      </div>
    );
  }
}

export default Subscription;
