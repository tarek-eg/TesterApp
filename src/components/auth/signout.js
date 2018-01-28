// @ts-nocheck
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signout extends Component {
  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.signoutUser();
    }
  }
  render() {
    return <div>You are logged out</div>;
  }
}

export default connect(null, actions)(Signout);
