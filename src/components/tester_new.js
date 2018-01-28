// @ts-nocheck
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class TesterNew extends Component {
  renderTextField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-control ${touched && error ? "is-invalid" : ""}`;
    return (
      <div className="form-group row">
        <label htmlFor={field.name} className="col-sm-4 col-form-label">
          {field.label}
        </label>
        <input
          placeholder={field.placeholder}
          {...field.input}
          type={field.type}
          className={className}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  renderCheckBoxField(field) {
    return (
      <div className="form-check form-check-inline">
        <input
          placeholder={field.placeholder}
          {...field.input}
          type={field.type}
          className="form-check-input"
        />
        <label htmlFor={field.name} className="form-check-label">
          {field.label}
        </label>
      </div>
    );
  }

  onSubmit(values) {
    this.props.addTester(values, () => {
      this.props.history.push("/");
    });
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="container col-sm-6 float-center" style={{ padding: 10 }}>
        <div className="card text-primary border-default">
          <h3 className="card-header">Add New tester</h3>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="MSISDN"
              placeholder="MSISDN"
              name="number"
              component={this.renderTextField}
              type="number"
            />
            <Field
              label="User"
              placeholder="user"
              name="name"
              component={this.renderTextField}
              type="text"
            />
            <Field
              label="Arabic"
              name="bot1"
              component={this.renderCheckBoxField}
              type="checkbox"
            />
            <Field
              label="English"
              name="bot2"
              component={this.renderCheckBoxField}
              type="checkbox"
            />
            <Field
              label="French"
              name="bot3"
              component={this.renderCheckBoxField}
              type="checkbox"
            />
            <div className="form-group-row">
              <button
                disabled={pristine || submitting}
                type="submit"
                className="btn btn-primary"
              >
                Save
              </button>
              <Link className="btn btn-danger" to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.number) {
    errors.number = "Please enter a valid MSISDN number";
  }

  if (!values.name) {
    errors.name = "Please enter tester name";
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
  form: "testerForm"
})(connect(mapStateToProps, actions)(TesterNew));
