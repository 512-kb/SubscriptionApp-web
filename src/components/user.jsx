import React from "react";
import Header from "./header";
import history from "../history";
import CardSection from "./card";
import Subscription from "./tabs/subscription";
import ChangePlan from "./tabs/changePlan";
import axios from "axios";
import URL from "../url";
class User extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    //console.log(props.location.state);
    this.loadUser();
    this.state = this.props.location.state;
    this.state.plan = "";
  }
  componentDidMount = async () => {
    const info = await axios.get(URL + "/user/getInfo?_id=" + this.state._id);
    if (info.data.length <= 0) {
      history.goBack();
      return;
    }
    if (info.data.id.length > 0)
      await axios
        .get(URL + "/user/subscriptions/?id=" + this.state.id)
        .then(res => {
          info.data.existingPlan = {
            id: res.data.plan.id,
            name: res.data.plan.nickname,
            sub_id: res.data.sub_id
          };
        });
    //console.log(info);
    this.setState(info.data);
  };

  loadUser = () => {
    if (!sessionStorage.getItem("user")) {
      history.goBack();
      return;
    }
  };

  activatePlan = obj => {
    //console.log(obj);
    this.setState(obj);
  };

  setPlan = plan => {
    this.setState({ plan });
  };

  setCredits = credits => {
    this.setState({ credits });
  };

  getTabToRender = () => {
    if (this.state.plan.length > 0)
      return (
        <CardSection
          plan={this.state.plan}
          name={this.state.name}
          email={this.state.email}
          _id={this.state._id}
          activatePlan={this.activatePlan}
        />
      );
    if (this.state.credits <= 0)
      return (
        <ChangePlan
          activatePlan={this.activatePlan}
          user={{
            _id: this.state._id,
            existingPlan: this.state.existingPlan
          }}
          setPlan={this.setPlan}
        />
      );
    return (
      <Subscription
        setCredits={this.setCredits}
        user={{
          _id: this.state._id,
          existingPlan: this.state.existingPlan
        }}
        activatePlan={this.activatePlan}
      />
    );
  };

  render() {
    //console.log(this.state);
    return (
      <div>
        <Header name={this.state.name} credits={this.state.credits} />
        {this.getTabToRender()}
      </div>
    );
  }
}

export default User;
