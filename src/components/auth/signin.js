// @ts-nocheck
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signin extends Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.history.push("/");
    }
  }
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-control ${touched && error ? "is-invalid" : ""}`;
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          placeholder={field.placeholder}
          className={className}
          {...field.input}
          type={field.type}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.signinUser(values);
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container col-sm-6 float-center" style={{ padding: 10 }}>
        <div className="card text-primary border-default">
          <h3 className="card-header">Sign In</h3>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Email"
              placeholder="email"
              name="email"
              component={this.renderField}
              type="email"
            />
            <Field
              label="Password"
              placeholder="password"
              name="password"
              component={this.renderField}
              type="password"
            />
            <button className="btn btn-primary">Sign In</button>
            <Link to="/signup">Register</Link>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter your email";
  }

  if (!values.password) {
    errors.password = "Please enter your password";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    erorrMessage: state.auth.error,
    authenticated: state.auth.authenticated
  };
}

export default reduxForm({
  validate,
  form: "signinForm"
})(connect(mapStateToProps, actions)(Signin));
