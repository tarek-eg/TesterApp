import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import _ from "lodash";

class TestersTable extends Component {
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.fetchTesters();
    }
  }

  renderTesters() {
    return _.map(this.props.testers, tester => {
      return (
        <tr key={tester._id}>
          <td>
            <Link to={`/testers/${tester._id}`}> {tester.name} </Link>
          </td>
          <td> {tester.number} </td>
          <td> {JSON.stringify(tester.bot1)} </td>
          <td> {JSON.stringify(tester.bot2)} </td>
          <td> {JSON.stringify(tester.bot3)} </td>
        </tr>
      );
    });
  }

  render() {
    if (!this.props.testers) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Arabic</th>
              <th>English</th>
              <th>French</th>
            </tr>
          </thead>
          <tbody>{this.renderTesters()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    testers: state.testers,
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, actions)(TestersTable);
