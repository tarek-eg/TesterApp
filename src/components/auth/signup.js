// @ts-nocheck
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signup extends Component {
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
    console.log(values);
    this.props.signupUser(values);
  }
  // replaced by toasters
  renderAlert() {
    // if (this.props.erorrMessage) {
    //   console.log(this.props.erorrMessage);
    //   return (
    //     <div className="alert alert-danger">
    //       <strong>Oops! </strong>
    //       {this.props.erorrMessage}
    //     </div>
    //   );
    // }
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container col-sm-6 float-center" style={{ padding: 10 }}>
        <div className="card text-primary border-default">
          <h3 className="card-header">Sign Up</h3>
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
            <Field
              label="Confirm Password"
              placeholder="Confirm password"
              name="confirmPassword"
              component={this.renderField}
              type="password"
            />

            {this.renderAlert()}
            <button className="btn btn-primary">Sign Up</button>
            <Link to="/signin">Sign In</Link>
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
  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password first";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords doesn't match";
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
  form: "signupForm"
})(connect(mapStateToProps, actions)(Signup));
