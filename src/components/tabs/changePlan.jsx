import React, { Fragment } from "react";
import { Button, Header } from "semantic-ui-react";
import axios from "axios";
import URL from "../../url";

class ChangePlan extends React.Component {
  state = { requestSent: false };

  renewPlan = async planID => {
    this.setState({ requestSent: true });
    const res = await axios.post(URL + "/user/PlanChange", {
      existingPlan: this.props.user.existingPlan,
      newPlan: planID,
      _id: this.props.user._id
    });
    this.setState({ requestSent: false });
    if (res.data === "no") alert("Failed");
    else this.props.activatePlan(res.data);
  };

  render() {
    // console.log(this.props);
    return (
      <Fragment>
        <Header as="h1">Choose a Plan</Header>
        {this.state.requestSent ? (
          <Button secondary loading primary>
            Loading
          </Button>
        ) : (
          <Fragment>
            <Button
              animated="fade"
              color="blue"
              onClick={() =>
                this.props.user.existingPlan === "none"
                  ? this.props.setPlan("plan_GimROblRVgZszu")
                  : this.renewPlan("plan_GimROblRVgZszu")
              }
            >
              <Button.Content visible>PLAN 1</Button.Content>
              <Button.Content hidden>₹9/month</Button.Content>
            </Button>
            <Button
              animated="fade"
              color="green"
              onClick={() =>
                this.props.user.existingPlan === "none"
                  ? this.props.setPlan("plan_GimSst3abVRevj")
                  : this.renewPlan("plan_GimSst3abVRevj")
              }
            >
              <Button.Content visible>PLAN 2</Button.Content>
              <Button.Content hidden>₹19/month</Button.Content>
            </Button>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default ChangePlan;
