// @ts-nocheck
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <li className="nav-item" key="2">
          <Link to="/signout" className="nav-link">
            Sign Out
          </Link>
        </li>
      );
    }
    return [
      <li className="nav-item" key="1">
        <Link to="/signin" className="nav-link">
          Sign In
        </Link>
      </li>,
      <li className="nav-item" key="2">
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      </li>
    ];
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand nav-link" to="/">
          ORANGE
        </Link>
        <Link className="navbar-brand nav-link" to="/testers/new">
          Add Tester
        </Link>
        <ul className="navbar-nav ml-auto">{this.renderLinks()}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}
// @ts-ignore
export default connect(mapStateToProps)(Header);
